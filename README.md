<!-- markdownlint-disable MD032 MD033-->
<!-- Write your README.md file. Build something amazing! This README.md template can guide you to build your project documentation, but feel free to modify it as you wish 🥰 -->

# **Fasty - Package Delivery Courier PWA**

> Empower your delivery management with my cutting-edge tool designed for rapid creation and seamless exchange of deliveries. Learn and apply best practices of Feature Sliced Design along the way..

<div align="center">
  <!-- Change your logo -->
  <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa">
    <img width="100%" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/project_image.jpg" alt="@KoninMikhail/fasty-package-delivery-courier-pwa's logo">
  </a>
  <br>
  <a href="#">
    <img src="https://img.shields.io/badge/build-stable-blue?style=for-the-badge&color=succeess" alt="KoninMikhail/fasty-package-delivery-courier-pwa">
     </a>
    <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/issues">
      <img src="https://img.shields.io/github/issues/KoninMikhail/fasty-package-delivery-courier-pwa?color=0088ff&style=for-the-badge&logo=github" alt="KoninMikhail/fasty-package-delivery-courier-pwa issues"/>
    </a>
    <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/pulls">
      <img src="https://img.shields.io/github/issues-pr/koninmikhail/social-analytics-dashboard-template?color=0088ff&style=for-the-badge&logo=github"  alt="KoninMikhail/ pull requests"/>
    </a>
    <a href="https://fasty-app.vercel.app/">
         <img src="https://img.shields.io/badge/ -live demo-blue?style=for-the-badge&color=important" alt="KoninMikhail/fasty-package-delivery-courier-pwa link to live demo.">
    </a>
    <a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/fork">
      <img src="https://img.shields.io/badge/fork%20this-app-blue?logo=github-sponsors&style=for-the-badge&color=ff69b4" alt="KoninMikhail/fasty-app create fork">
    </a>
</div>

<br />

Welcome to the Fasty App, a robust PWA designed to streamline delivery operations for couriers. Built with cutting-edge technologies like React, TypeScript, and Feature Sliced Design, our app is tailored to meet the dynamic needs of modern courier services.

## Key Features:
- **Day/Night Theme:** Seamlessly switch between day and night modes for optimal readability and user experience.
- **Multilingual Support:** Effortlessly switch between Russian and English languages.
- **Offline Capable:** Enjoy uninterrupted service with PWA capabilities, ensuring your deliveries are managed even without an active internet connection.
- **Multi-Platform:** Access the app from mobile, tablet, or PC, ensuring a consistent experience across all devices.
- **Courier Authentication:** Secure login for couriers to manage their deliveries.
- **Delivery Selection:** Choose suitable deliveries from a list of upcoming tasks.
- **My Deliveries:** View your current and scheduled deliveries easily.
- **History:** Browse through completed deliveries for reference and record-keeping.
- **Search Function:** Quickly find specific deliveries using the in-app search.
- **Delivery Maps:** Utilize OpenStreetMap integration for precise navigation on the delivery page.
- **Profile Management:** Edit your profile information and change your avatar quickly and intuitively.

## Our Objectives:
- **Rapid Deployment:** Quickly set up a comprehensive delivery service.
- **Feature Sliced Design Best Practices:** Showcase the best practices in Feature Sliced Design for scalable and maintainable architecture.
- **Easy Onboarding:** Facilitate rapid learning of the architecture for new developers.
- **Collaboration-Friendly:** Enable users to suggest and contribute new functionalities.

Experience the future of delivery management with the Fasty App — where efficiency meets innovation.

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa">
    <img width="100%" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/project_image_mobile.jpg" alt="@KoninMikhail/fasty-package-delivery-courier-pwa's logo">
  </a>

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa">
    <img width="100%" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/project_image_desktop.jpg" alt="@KoninMikhail/fasty-package-delivery-courier-pwa's logo">
  </a>

<br />

## Request features ⚡

> Use [issue](https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/issues) and follow the rules :)

## Report bug 🤬

> The data from repository is provided an 'As is', without any guarantees. All the data provided is used at your own risk.
> **If you want report a bug** - use [issue](https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/issues)

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/menu.png" width="50px" />

## TABLE OF CONTENTS

- [General](#)
  - [Instrodution](#fasty---package-delivery-courier-pwa)
  - [Key Features](#key-features)
  - [Request feature](#request-features-)
  - [Report bug](#report-bug-)
- [Quick start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Offline Mode](#offline-mode)
  - [Multilingual Support](#multilingual-support)
- [Architecture](#architecture)
  - [Feature Sliced Design](#feature-sliced-design)
  - [Components Structure](#component-structure)
  - [Naming Conventions](#naming-conventions)
  - [Data Validation](#data-validation)
- [Authentication](#authentication)
- [Profile Management](#profile-management)
- [Delivery Management](#delivery-management)
- [Roadmap](#roadmap)
- [Why Should You Learn This?](#why-should-you-learn-this)
- [Contributing](#contributors)
- [Buy Me A Coffee](#buy-me-a-coffee)
- [License and Changelog](#license-and-changelog)


<br /><br />

<img align="left" src="https://raw.githubusercontent.com/KoninMikhail/fasty-package-delivery-courier-pwa/master/.resources/icons/qs.png" width="50px" />

# Quick start

## Requirements:
>- **NodeJS:** 20 (My version at building time)
>- **PNPM**
>- **Yarn:** 1.22 (only if you doesnt have backend)

## Installation


> If you have your own backend:
1. Clone this repository:
2. Go to `fasty-package-delivery-courier-pwa` folder.
3. Make `.env` from `.env.example` and past your data
4. Install pnpm via `npm install -g pnpm`
5. Install depends via `pnpm i`
6. Build project -> `pnpm build` & Enjoy !

> If you need backend with demoData:
1. Register [Atlas](https://www.mongodb.com/products/platform/atlas-database) account and create mongodb database
2. clone [Fasty.API](https://github.com/KoninMikhail/fasty-pwa-demo-api) 
3. Go to `fasty-pwa-demo-api`
4. Make `.env` from `.env.example` and past your settings
5. Install yarn via `npm install -g yarn`
6. Install deps `yarn install`;
7. Seed demo data via `prisma db seed`.
8. Start your backend `yarn dev` (start in dev mode)
9. Return to upper guide & Enjoy it!

## Running the App

> Developer mode
- Run `pnpm dev`

> Preview (do not use for production)
- `pnpm preview`

> Production with nginx
- install `nginx` on your server
- copy `dist` to `/usr/share/nginx/html`
- create nginx config file based on template

```
user nginx;

worker_processes    auto;

events { worker_connections 1024; }

http {
    server {
        server_tokens off;

        listen  8080;
        root    /usr/share/nginx/html;
        include /etc/nginx/mime.types;
 
        location / {
            try_files $uri $uri/ /index.html;
        }

        gzip            on;
        gzip_vary       on;
        gzip_http_version  1.0;
        gzip_comp_level 5;
        gzip_types
                        application/atom+xml
                        application/javascript
                        application/json
                        application/rss+xml
                        application/vnd.ms-fontobject
                        application/x-font-ttf
                        application/x-web-app-manifest+json
                        application/xhtml+xml
                        application/xml
                        font/opentype
                        image/svg+xml
                        image/x-icon
                        text/css
                        text/plain
                        text/x-component;
        gzip_proxied    no-cache no-store private expired auth;
        gzip_min_length 256;
        gunzip          on;
    }
}
```

## Offline Mode

The offline mode is enabled through the following mechanisms:
- **Data Provider:** [Workbox by Google](https://developers.google.com/web/tools/workbox) for PWA capabilities.
- **Connection Status Tracking:** Monitoring the internet connection status.

Caching settings for requests can be found in `vite.config.mts`, allowing you to customize how data is cached and retrieved when offline.

The mechanism for determining if the user is online can be found in `@/entities/viewer`, ensuring a seamless user experience even when the internet connection is interrupted.


## Multilingual Support

Our project supports multiple languages, ensuring a localized experience for users worldwide. Below are the details of our multilingual implementation:

### Language Provider: `i18next`

We use `i18next` as our primary library to handle multilingual capabilities. This allows us to dynamically switch languages and handle translations efficiently.

### Structure of Translations

1. **Translation Namespaces (`translationNS`s):**
  - We organize our translations into multiple namespaces, making it easier to manage and scale our localization files.

2. **Locale Folders:**
  - Translations are segregated into JSON files based on their context (e.g., `entities/**/*/locale`, `features/**/*/locale`, `widgets/**/*/locale`, etc.).
  - This ensures that translations are neatly organized and modular.

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />

## Architecture

## Feature Sliced Design

Feature Sliced Design is an outstanding architecture that has significantly contributed to the successful implementation of this project and numerous others within our company. To show our appreciation to its creators, we have decided to make a branch of this project publicly available. This allows those who are new to Feature Sliced Design to see practical implementations of various use cases. One of the versions of this application is actively used in production environments, showcasing its real-world applicability.

## Project Structure

- **shared** - Core functions devoid of business logic
  - **api** - API client for server communication, built using `Zodios`
  - **constants** - Crucial global settings and configurations
  - **lib** - Collection of global helpers and type guards
  - **types** - Global type declarations used throughout the project
  - **ui** - Common UI components used across the application
  - **assets** - Additional resources required by the compiled application
- **entities** - Storage and management for global business abstractions, including templates, effects, and data fetching mechanisms
- **features** - Logic that processes user actions with significant business value
- **widgets** - Components that integrate layers above without managing the data themselves
- **pages** - Layer where primary data handling logic resides; responsible for changing widget states or re-fetching data from the server. **Note**: It's considered best practice to avoid placing this logic in `widgets`.
- **app** - Entry point and initialization hub of the entire application

## Components Structure

The main template for components is built using the following structure:

- `index.ts` - The main entry point of the component and the point of interaction with it. We do not support other interactions to adhere to the core principles of `Feature Sliced Design`.
- `init.ts` - The main file where all necessary resources for the abstraction are connected, such as localizations, and so on.
- `/locales` - Storage for localization files for the current abstraction. Tip: You can copy/paste a file here to quickly add localization in your language.
- `/config` - The main storage for configuration variables used in the current abstraction.
- `/lib` - Helpers, type guards, and other utility functions that may be used in this abstraction and higher layers.
- `/model` - The main folder or file containing the business logic of the current abstraction (models, factories, effects).
- `/ui` - All UI components related to this abstraction.
- `/@x` - Allowed cross imports between entities. **Note:** Use with great caution to avoid circular dependencies. The decision for this convention was made by the community and is not an official `Feature Sliced Design` specification.

## Naming Conventions

- `$$storeName`: Used for naming derived stores that are based on a parent store.
- `whatEverChanged`, `whatEverInited`: Naming pattern for events in the main abstraction model. These events are triggered by user actions in the UI and are used to initiate core business logic processes.


## Data Validation

The application uses a contract system for validating data received from the server. This ensures type safety and data integrity throughout the system.

### Why Use Contracts?

Contracts help maintain a consistent data structure and prevent errors by validating incoming data against predefined schemas. This is particularly useful for:
- Ensuring data integrity
- Simplifying debugging
- Enforcing API contracts between frontend and backend

### Primary Contract Validation Provider

We use [Zod](https://github.com/colinhacks/zod) as our primary library for data validation. Zod is a TypeScript-first schema declaration and validation library that enables comprehensive and efficient data validation.

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />


## Authorization

Our application employs JSON Web Tokens (JWT) as the core mechanism for authentication and authorization. This choice facilitates a flexible system for managing user sessions and renewing tokens, ensuring a high level of security for end users.

### Key Benefits:
1. **Flexibility**: JWT allows for a dynamic and adaptable authorization process.
2. **Security**: JWT ensures secure data transmission between the client and server.
3. **Offline Capability**: Given that the application can function offline, the JWT facilitates a deferred verification mechanism for user tokens. This means that even if the network is disconnected, the user's session can remain valid and be verified once the connection is restored.

### How It Works:
- Upon login, a JWT is issued and stored on the client side.
- This token is sent with each request to verify the user's identity and permissions.
- Tokens are periodically renewed to maintain security and session continuity.
- In offline mode, tokens are queued for later verification once the connection is re-established.

This approach optimizes both the user experience and the overall security architecture of the application.

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />

## Profile Management

Each user in the application has a personal profile stored on the server. The profile includes:

- **Name:** The user's full name.
- **Avatar:** The user's profile picture.
- **Password:** The user's account password.
- **Delivery Search History:** Records of the user's previous delivery search queries on the server.
- **Additional Settings:**
  - Language preferences
  - Theme (e.g., light or dark mode)
  - Other related data

### Profile Features

Users have the ability to:

- **Update Avatar:** Change their profile picture.
- **Change Password:** Update their account password for security.

These features provide users with the flexibility to personalize their profiles and maintain account security.

<br /><br />


<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />

## Delivery Management

The core workflow for a courier involves the following pipeline:

1. Select and take a suitable delivery order
2. Maintain the delivery status
3. Upon completion, set the status to indicate successful delivery

This pipeline is implemented in the application as follows:

- **Delivery Marketplace**: The main page features a marketplace with deliveries that have the status `created` and are not assigned to any courier. These deliveries can be filtered by date, delivery type (on foot or by car), and weight.
- **Assign to Delivery**: Once a courier clicks `assign to delivery`, the delivery status changes to `delivering` and the courier is linked to the delivery. The delivery then becomes unavailable to other couriers.
- **Managing Delivery Status**: When a delivery has the status `delivering` and is assigned to a courier, the courier can set the status to `done` with an optional note for the responsible manager, or set the status to `cancelled` with a mandatory reason for cancellation.
- **Delivery History**: All deliveries of the current user with the statuses `done` and `cancelled` are recorded in the delivery history.

### Additional Features

- **Offline Availability**: All deliveries of the current user with the status `delivering` are available offline in case of internet connectivity loss.
- **Delivery Map**: A map is available with markers for the delivery points.

<br /><br /> 

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />


## Roadmap

The application is currently in its beta release phase and is awaiting feedback to determine the necessity and direction of the roadmap.


<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />


## Why Should You Learn This?

Like any other project, ours is not perfect. It may have bugs and shortcomings. You have the opportunity to explore various use cases for implementing features using Feature-Sliced Design. Additionally, you are welcome to propose your improvements to our project.

Moreover, you can fork this project and build something of your own that could bring you joy or even profit, as the project is under an open license.


<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/contributors.png" width="50px" />


## Contributors

I am <3 contributions big or small. If you help my project --> 🍰**link to your profile will be here**🍰.

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KoninMikhail/fasty-package-delivery-courier-pwa" />
</a>

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/coffee.png" width="50px" />

## Buy Me A Coffee

<a href="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/generate">
  <img alt="KoninMikhail/fasty-package-delivery-courier-pwa Author brand logo without text" align="right" src="https://raw.githubusercontent.com/KoninMikhail/fasty-package-delivery-courier-pwa/main/.resources/images/logo.png" width="25%" />
</a>

Currently I'm seeking for new sponsors to help maintain this project! ❤️

With every donation you make - you're helping with development of this project. _You will be also featured in project's README.md_, so everyone will see your contribution and visit your content⭐.

<a href="https://yoomoney.ru/to/410011749810070">
  <img src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/images/sponsor.svg">
</a>

#### OR CLICK BUTTON

[![GitHub followers](https://img.shields.io/github/followers/koninmikhail.svg?style=social)](https://github.com/koninmikhail)
[![GitHub stars](https://img.shields.io/github/stars/koninmikhail/fasty-package-delivery-courier-pwa.svg?style=social)](https://github.com/koninmikhail/fasty-package-delivery-courier-pwa/stargazers)
[![GitHub watchers](https://img.shields.io/github/watchers/koninmikhail/fasty-package-delivery-courier-pwa.svg?style=social)](https://github.com/koninmikhail/fasty-package-delivery-courier-pwa/watchers)
[![GitHub forks](https://img.shields.io/github/forks/koninmikhail/fasty-package-delivery-courier-pwa.svg?style=social)](https://github.com/koninmikhail/fasty-package-delivery-courier-pwa/network/members)

<br /><br />

<img align="left" src="https://github.com/KoninMikhail/fasty-package-delivery-courier-pwa/blob/main/.resources/icons/law.png" width="50px" />

## **License and Changelog**

> Copyright (c) 2023, KoninMikhail.
> This project under **[MIT](LICENSE)** license. See the changes in the **[CHANGELOG.md](CHANGELOG.md)** file.
