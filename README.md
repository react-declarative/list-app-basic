# react-declarative

> Реализация формы документа и справочника

**Поддержать проект**

> [!IMPORTANT]
> Сделано с использованием [react-declarative](https://github.com/react-declarative/react-declarative), чтобы решить ваши проблемы. **⭐Star** and **💻Fork** будет крайне полезен

# Описание

## Проблема

На текущий момент при разработке решений с применением библиотеки React встает проблема написания CRM систем в связи с наличием многократно повторяющихся форм списков и карточек элемента списка. Как следствие, при классической разработке с применением Redux, встает проблема дублирования кода, осуществляющего загрузку данных с сервера с пагинацией, сортировкой, фильтрацией, создания и сохранения измененных данных.

## Решение

Во избежание каскада ошибок в дублированном коде, необходимо создать стандарт, осуществляющий разбиение списочных форм и элементов списка по роутам, а также однотипный механизм загрузки и сохранения данных. Для реализации было решено сделать проект-пример, который позволял бы наглядно продемонстрировать разработанную методологию на настоящем коде.

## Запуск

```
npm install
npm start
npx open-cli http://localhost:3000/
```

# Скриншоты

## Списочная форма

> Форма элемента списка наглядно демонстрирует вывод элементов из CRUD c передачей параметров в GET запросе для сортировки, фильтрации, пагинации

![list](./docs/list.png)

## Форма элемента списка

> Форма элемента списка открывается по клику на элемент списка или кнопке "+" в правом верхнем углу

![one](./docs/one.png)

## Боковое меню

> Переключение списочных форм осуществляется через боковое меню

![scaffold](./docs/scaffold.png)
