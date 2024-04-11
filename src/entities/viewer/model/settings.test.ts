import { describe, it, expect } from "vitest";
import { $homeUpcomingDeliveriesCount, countChanged } from "./settings";
import { fork, allSettled } from "effector";
import { DEFAULT_UPCOMING_DELIVERIES_COUNT } from "../config";

describe("upcoming deliveries count store", () => {
  it("initializes with the default upcoming deliveries count", async () => {
    const scope = fork();
    // Directly checking the initialized state, so no need for `allSettled` here
    expect(scope.getState($homeUpcomingDeliveriesCount)).toBe(
      DEFAULT_UPCOMING_DELIVERIES_COUNT,
    );
  });

  it("updates the count correctly for valid counts", async () => {
    const testCounts = [1, 5, 10]; // Example of valid counts
    for (const count of testCounts) {
      const scope = fork();
      await allSettled(countChanged, { scope, params: count });
      expect(scope.getState($homeUpcomingDeliveriesCount)).toBe(count);
    }
  });

  it("resets to default count for invalid counts", async () => {
    const invalidCounts = [-1, 0, 0.5]; // Example of invalid counts
    for (const count of invalidCounts) {
      const scope = fork();
      await allSettled(countChanged, { scope, params: count });
      expect(scope.getState($homeUpcomingDeliveriesCount)).toBe(
        DEFAULT_UPCOMING_DELIVERIES_COUNT,
      );
    }
  });

  it("treats the boundary condition (count = 1) as valid", async () => {
    const scope = fork();
    await allSettled(countChanged, { scope, params: 1 });
    expect(scope.getState($homeUpcomingDeliveriesCount)).toBe(1);
  });
});
