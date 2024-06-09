-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 09, 2024 at 12:57 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logowanie_01_react`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `user`, `password`, `name`, `surname`) VALUES
(3, 'seba', '$2a$10$JqXiEcrrlaiUZ41rC1yeNOLTZJ.s3dNQWJxVytIowm54YwAeHOExe', 'seba', 'seba'),
(4, 'erne', '$2a$10$Xc1yY38A5OhBwj0GqEMYF.mTEosqq5WXHq.OrnwjGJFUefM44l4eW', 'erne', 'erne');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pytania`
--

CREATE TABLE `pytania` (
  `Id` int(11) NOT NULL,
  `Pytanie` text DEFAULT NULL,
  `Odpowiedz` char(1) DEFAULT NULL,
  `A` text DEFAULT NULL,
  `B` text DEFAULT NULL,
  `C` text DEFAULT NULL,
  `D` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pytania`
--

INSERT INTO `pytania` (`Id`, `Pytanie`, `Odpowiedz`, `A`, `B`, `C`, `D`) VALUES
(1, 'Zapisane w kodzie szesnastkowym składowe RGB koloru #AA41FF po przekształceniu do kodu dziesiętnego wynoszą kolejno', 'A', '170, 65, 255', '160, 64, 255', '170, 64, 255', '160, 65, 255'),
(2, 'Jednym z etapów publikacji mobilnej w sklepie Google Play są testy Beta, których cechą charakterystyczną jest to, że są one:', 'C', 'podzielone na testy funkcjonalne, wydajnościowe i skalowalności', 'przeprowadzane w oparciu o dokument z przypadkami testowymi', 'wykonane przez grupę docelowych użytkowników aplikacji', 'wykonywane przez grupę zatrudnionych testerów z firmy Google'),
(3, 'Zastosowanie typu DECIMAL języka SQL wymaga wcześniejszego zdefiniowania długości (liczby cyfr) przed przecinkiem oraz długości cyfr po przecinku. Jest to zapis:', 'B', 'logiczny', 'zmiennoprzecinkowy', 'łańcuchowy', 'stałoprzecinkowy'),
(4, '4. Metoda poszukiwań w tablicach posortowanych, która polega na podzieleniu tablicy na kilka bloków i wyszukaniu liniowym tylko w tym bloku, w którym docelowy element może się znajdować, w języku angielskim nosi nazwę', 'C', 'A. Ternary search.', 'B. Binary search.', 'C. Jump search.', 'D. Exponential search.'),
(5, 'Aby zaprojektować zestaw danych do zainicjowania algorytmu sortowania bąbelkowego tablicy, należy zastosować przynajmniej typy:', 'C', 'dwa tablicowe, jeden liczbowy do kontroli pętli', 'jeden tablicowy, jeden liczbowy do kontroli pętli, dwa do zamiany elementów miejscami', 'jeden tablicowy, dwa liczbowe do kontroli pętli, jeden do zamiany elementów miejscami', 'dwa tablicowe, dwa do zamiany elementów miejscami'),
(6, 'Rekomendacje standardu WCAG 2.0 związane z percepcją dotyczą:', 'A', 'przedstawienia komponentów interfejsu użytkownika', 'zapewnienia interakcji pomiędzy komponentami użytkownika przy użyciu klawiatury', 'zapewnienia wystarczającej ilości czasu na przeczytanie i przetworzenie treści', 'zrozumienia i rzetelności w dostarczonych treściach na stronie'),
(7, 'Założenie programowania obiektowego polegające na ukrywaniu składowych klasy tak, aby były one dostępne tylko metodom tej klasy lub funkcjom zaprzyjaźnionym, to', 'D', 'wyjątki.', 'dziedziczenie.', 'polimorfizm.', 'hermetyzacja.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyniki`
--

CREATE TABLE `wyniki` (
  `Id` int(11) NOT NULL,
  `Id_zdajacego` int(11) DEFAULT NULL,
  `wynik` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wyniki`
--

INSERT INTO `wyniki` (`Id`, `Id_zdajacego`, `wynik`) VALUES
(2, 3, 1),
(3, 3, 2),
(4, 3, 2),
(5, 3, 2),
(6, 3, 1),
(7, 3, 1),
(8, 3, 2),
(9, 3, 3),
(10, 3, 3),
(11, 3, 1),
(12, 3, 3),
(13, 3, 3),
(14, 4, 3),
(15, 4, 2),
(16, 3, 5),
(17, 3, 3);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `pytania`
--
ALTER TABLE `pytania`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `wyniki`
--
ALTER TABLE `wyniki`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pytania`
--
ALTER TABLE `pytania`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wyniki`
--
ALTER TABLE `wyniki`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
