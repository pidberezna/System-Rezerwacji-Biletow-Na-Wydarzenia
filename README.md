# System Rezerwacji Biletów na Wydarzenia

## Opis projektu

Aplikacja umożliwia użytkownikom przeglądanie dostępnych wydarzeń, rezerwowanie biletów, a także dodawanie własnych wydarzeń. Projekt powstał w celu uproszczenia procesu organizacji i rezerwacji wydarzeń online.

## Funkcjonalności

- Rejestracja i logowanie użytkownika
- Wylogowanie
- Dodawanie własnych wydarzeń
- Przeglądanie wydarzeń innych użytkowników
- Rezerwacja miejsc na wydarzenia (z wyborem ilości)
- Anulowanie rezerwacji
- Przeglądanie własnych rezerwacji

## Uruchomienie aplikacji

Projekt można uruchomić za pomocą `npm`. Upewnij się, że masz zainstalowanego Node.js w wersji co najmniej 18.

### Instalacja zależności

```bash
npm install
```

### Uruchomienie frontend

```bash
cd client
npm run dev
```

### Uruchomienie backend

```bash
cd api
npm start
```

## Wykorzystane biblioteki zewnętrzne

### Frontend

- `react` – biblioteka do budowy interfejsu
- `react-router-dom` – routing po stronie klienta
- `axios` – obsługa zapytań HTTP
- `tailwindcss` – framework CSS
- `date-fns` – obsługa dat
- `vite` – szybki bundler do środowiska deweloperskiego

### Backend (NestJS)

- `@nestjs/*` – główny framework backendowy
- `mongoose` – obsługa MongoDB
- `bcrypt` – hashowanie haseł
- `jsonwebtoken` – generowanie i weryfikacja tokenów JWT
- `multer` – obsługa przesyłania plików
- `dotenv` – zmienne środowiskowe
- `class-validator`, `class-transformer` – walidacja i transformacja DTO
- `cookie-parser`, `cors`, `image-downloader` – pomocnicze biblioteki serwera

## Struktura aplikacji

### Backend (`api/`)

Zbudowany w oparciu o NestJS, podzielony na moduły:

- `auth` – rejestracja, logowanie, JWT, guardy
- `users` – dane użytkowników
- `booking` – rezerwacje
- `user-events` – zarządzanie wydarzeniami użytkownika
- `app` – konfiguracja ogólna

Każdy moduł zawiera:

- **kontrolery** – odpowiadają za odbieranie żądań HTTP
- **serwisy** – logika biznesowa
- **DTO i encje** – definicje struktur danych i ich walidacja

### Frontend (`client/`)

Aplikacja React z wykorzystaniem Vite i TailwindCSS. Kluczowe komponenty:

- **Strony (pages/):**

  - `LoginPage.tsx`, `RegisterPage.tsx` – logowanie i rejestracja
  - `EventsPage.tsx`, `EventPage.tsx`, `EventsFormPage.tsx` – przeglądanie i tworzenie wydarzeń
  - `BookingsPage.tsx`, `BookingPage.tsx` – przeglądanie i tworzenie rezerwacji

- **Komponenty:**
  - `BookingWidget.tsx`, `EventGallery.tsx`, `EventImg.tsx`, `Header.tsx`, `PhotosUploader.tsx`, `UserContext.tsx`

## Przykładowe dane wejściowe

Aplikacja nie wymaga danych wejściowych przy starcie. Każdy użytkownik może się zarejestrować i od razu korzystać z funkcjonalności systemu.
