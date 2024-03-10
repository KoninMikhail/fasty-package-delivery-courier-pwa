import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeliveryCountdownCard } from "../DeliveryContdownCard";
import { Delivery } from "@/shared/api";
import { useEstimatedTime } from "../../../lib/hooks/useEstimatedTime";


const mockDelivery = {
  "id": 59,
  "car": true,
  "client_id": 32,
  "comment": "beatae et consequatur autem quis reprehenderit commodi illum index.ts",
  "contact_id": 69,
  "contents": "Черта лысого получишь! хотел было.",
  "deleted": false,
  "date": "2024-02-22",
  "express": true,
  "manager_id": 4,
  "order_id": 22,
  "states": "delivering",
  "time_end": "08:06",
  "time_start": "12:10",
  "order": {
    "id": 22,
    "client_id": 95,
    "contact_id": 127,
    "address_id": 122,
    "description": "Sed rem et sit laboriosam omnis. Quas autem ipsum in ut explicabo facilis. Sunt quod alias et tempore sunt. Quia eligendi voluptatum est tenetur ipsa dolor.",
    "cost": "74200.00",
    "state": "draft",
    "payment": "pre",
    "payment_type": "cash",
    "deleted": false,
    "created_at": "2024-02-07T10:15:05.000000Z",
    "updated_at": "2024-02-25T07:27:52.000000Z",
    "submanager": null,
    "deadline": "2024-02-13T09:16:11.000000Z"
  },
  "weight": "40",
  "courier": {
    "id": 19,
    "first_name": "Виктор",
    "last_name": "Козлов",
    "gender": "male",
    "email": "kozlov.v@test.ru",
    "email_verified_at": "2024-03-04T13:12:02.000000Z",
    "deleted": false,
    "created_at": "2024-03-04T13:12:02.000000Z",
    "updated_at": "2024-03-04T13:23:32.000000Z",
    "user_role": {
      "name": "Курьер",
      "capabilities": [],
      "states": []
    }
  },
  "courier_id": 19,
  "contact": {
    "id": 69,
    "client_id": 53,
    "name": "Белозёрова Лидия Сергеевна",
    "email": "beloziorova.l@yandex.ru",
    "job": "",
    "default": false,
    "deleted": false,
    "phone": "+7(999)125-12-02"
  },
  "client": {
    "id": 32,
    "client_type": "organization",
    "name": "Голизна, ПАО",
    "deleted": false,
    "created_at": "2024-03-04T13:12:03.000000Z",
    "updated_at": "2024-03-04T13:12:03.000000Z",
    "contacts": [
      {
        "id": 39,
        "client_id": 32,
        "name": "Гаврилова Доминика Львовна",
        "email": "gavrilova.d@golizna.ru",
        "job": "Владелец",
        "default": false,
        "deleted": false,
        "phone": "+7(930)700-47-68"
      },
      {
        "id": 40,
        "client_id": 32,
        "name": "Кудрявцева Анна Романовна",
        "email": "kudriavtseva.a@golizna.ru",
        "job": "Менеджер по закупкам",
        "default": false,
        "deleted": false,
        "phone": "+7(909)332-15-94"
      },
      {
        "id": 41,
        "client_id": 32,
        "name": "Щукин Даниил Евгеньевич",
        "email": "shchukin.d@golizna.ru",
        "job": "Менеджер по закупкам",
        "default": false,
        "deleted": false,
        "phone": "+7(974)986-82-21"
      }
    ],
    "addresses": [
      {
        "id": 44,
        "client_id": 32,
        "delivery_type": "cdek",
        "region": "Калужская",
        "city": "Подольск",
        "metro": null,
        "address": "спуск Славы, 38",
        "point_id": null,
        "cdek_type": "courier",
        "default": false,
        "deleted": false
      },
      {
        "id": 45,
        "client_id": 32,
        "delivery_type": "cdek",
        "region": "Мурманская",
        "city": "Луховицы",
        "metro": null,
        "address": "шоссе Гагарина, 21",
        "point_id": "SXT0095",
        "cdek_type": "pvz",
        "default": false,
        "deleted": false
      }
    ]
  },
  "address": {
    "id": 81,
    "client_id": 64,
    "delivery_type": "courier",
    "region": null,
    "city": null,
    "metro": "Театральная",
    "address": "спуск Гагарина, 98",
    "point_id": null,
    "cdek_type": null,
    "default": false,
    "deleted": false
  },
  "created_at": "2024-03-04T13:12:24.000Z",
  "updated_at": "2024-03-04T13:12:24.000Z",
  "manager": {
    "id": 4,
    "first_name": "Сергей",
    "last_name": "Сергеев",
    "gender": "male",
    "email": "postprinter@ottisk.com",
    "email_verified_at": null,
    "deleted": false,
    "created_at": "2024-03-04T13:12:00.000000Z",
    "updated_at": "2024-03-04T13:12:00.000000Z",
    "user_role": {
      "name": "Работник постпечати",
      "capabilities": [
        "user",
        "postprint",
        "worker",
        "services"
      ],
      "states": [
        "postprint/inbox",
        "postprint/in-progress",
        "quality-checking"
      ]
    }
  }
} as unknown as Delivery;

vi.mock("react-i18next", async () => {
  const originalModule = await vi.importActual<typeof import("react-i18next")>(
    "react-i18next"
  ); // Dynamically import the actual react-i18next module.

  return {
    ...originalModule, // Spread all exports from the original module.
    useTranslation: () => ({
      // Override the useTranslation hook as needed for testing.
      t: (key: string) => {
        if (key === "delivery.chip.expired") return "Expired";
        if (key === "delivery.chip.timeLeft") return "1h 3m";
        if (key === "delivery.label.address") return "Adress";
        if (key === "delivery.label.address.notFound") return "Undefined";
        if (key === "delivery.client.name.notFound") return "Not found";
        return key;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {
        })
      }
    })
  };
});


// Mock useEstimatedTime hook
vi.mock("../../../lib/hooks/useEstimatedTime", () => ({
  useEstimatedTime: vi.fn()
}));

describe("<DeliveryCountdownCard />", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it("renders correctly with valid delivery data", () => {
    // Mock useEstimatedTime to return 63 for 1h 3m
    vi.mocked(useEstimatedTime).mockReturnValue(63);

    const { asFragment } = render(<DeliveryCountdownCard delivery={mockDelivery} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays \"Expired\" when estimated time is negative", () => {
    // Mock useEstimatedTime to return a negative value indicating an expired time
    vi.mocked(useEstimatedTime).mockReturnValue(-10);

    render(<DeliveryCountdownCard delivery={mockDelivery} />);
    expect(screen.getByText("Expired")).toBeInTheDocument();
  });

  it("handles undefined delivery address and contact gracefully", () => {
    // Assuming 20 minutes left for delivery
    vi.mocked(useEstimatedTime).mockReturnValue(20);

    const delivery = {};

    render(<DeliveryCountdownCard delivery={delivery as unknown as Delivery} />);

    expect(screen.getByText("Undefined")).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });

  it("displays provided address and contact correctly", () => {
    // Custom time to avoid relying on real-time data
    vi.mocked(useEstimatedTime).mockReturnValue(45);

    render(<DeliveryCountdownCard delivery={mockDelivery} />);

    expect(screen.getByText("спуск Гагарина, 98")).toBeInTheDocument();
    expect(screen.getByText("Белозёрова Лидия Сергеевна")).toBeInTheDocument();
    expect(screen.getByText("+7(999)125-12-02")).toBeInTheDocument();
  });
});