---
title: コードベースのベストプラクティス
---

## Styling a component

We recommend styling components using our [design style guide](https://design-style-guide.freecodecamp.org/).

The colors are defined in [`variable.css`](/client/src/components/layouts/variables.css), and the fonts are in [`fonts.css`](/client/src/components/layouts/fonts.css).

We are strongly opinionated about adding new variables/tokens to the colors. After careful research, the colors have been chosen to respect the freeCodeCamp brand identity, developer experience, and accessibility.

The `!important` keyword may be used to override values in some cases (e.g. accessibility concerns). You should add a comment describing the issue, so it doesn't get removed in future refactoring.

### RTL support

We are striving to support right-to-left (RTL) layout in the codebase for languages that are read in this direction. For this, you need to be mindful of how to style components. Here are some quick rules of thumb to follow:

- Don't use `float` properties
  - Use Flexbox and Grid layouts instead, as they have RTL support already built-in, and those will be easier to maintain and review.
- Don't define the direction while using `margin` and `padding`: it may seem harmless to use `padding-right` and `margin-left`, but these directions aren't mirrored when the layout changes to RTL, and adding counter values for them in the RTL file makes maintaining the codebase harder.
  - Use logical properties for them: You can add the same spacing by using `padding-inline-end` and `margin-inline-start`, and you won't need to worry about RTL layout, as they follow where the line starts and ends, and you won't need to add any extra values in the RTL files, so people won't need to remember to change the same values in two files.
- Don't use `!important` in `font-family`: RTL layout uses different fonts compared to the LTR layout, when you add `!important` in the `font-family` property it affects the RTL layout too.

## General JavaScript

In most cases, our [linter](how-to-setup-freecodecamp-locally#follow-these-steps-to-get-your-development-environment-ready) will warn of any formatting which goes against this codebase's preferred practice.

It is encouraged to use functional components over class-based components.

## Specific TypeScript

### Migrating a JavaScript File to TypeScript

#### Git のファイル履歴を保持する

Sometimes changing the file from `<filename>.js` to `<filename>.ts` (or `.tsx`) causes the original file to be deleted, and a new one created, and other times the filename just changes - in terms of Git. Ideally, we want the file history to be preserved.

The best bet at achieving this is to:

1. ファイル名を変更する
2. フラグ `--no-verify` でコミットして、Husky がリントエラーについて不平を言うことを防ぐ
3. 別のコミットで、移行のために TypeScript にリファクタリングする

> [!NOTE] VScode 等のエディターは、ファイルが削除され新しいファイルが作成されたことを表示する可能性があります。 `git add .` に CLI を使用すると、VSCode はファイル名が変更されたものとしてステージに表示します。

### Naming Conventions

#### インターフェースと型

For the most part, it is encouraged to use interface declarations over type declarations.

React Component Props - suffix with `Props`

```typescript
interface MyComponentProps {}
// type MyComponentProps = {};
const MyComponent = (props: MyComponentProps) => {};
```

React Stateful Components - suffix with `State`

```typescript
interface MyComponentState {}
// type MyComponentState = {};
class MyComponent extends Component<MyComponentProps, MyComponentState> {}
```

Default - object name in PascalCase

```typescript
interface MyObject {}
// type MyObject = {};
const myObject: MyObject = {};
```

<!-- #### Redux Actions -->

<!-- TODO: Once refactored to TS, showcase naming convention for Reducers/Actions and how to type dispatch funcs -->

## Redux

### Action Definitions

```typescript
enum AppActionTypes = {
  actionFunction = 'actionFunction'
}

export const actionFunction = (
  arg: Arg
): ReducerPayload<AppActionTypes.actionFunction> => ({
  type: AppActionTypes.actionFunction,
  payload: arg
});
```

### How to Reduce

```typescript
// Base reducer action without payload
type ReducerBase<T> = { type: T };
// Logic for handling optional payloads
type ReducerPayload<T extends AppActionTypes> =
  T extends AppActionTypes.actionFunction
    ? ReducerBase<T> & {
        payload: AppState['property'];
      }
    : ReducerBase<T>;

// Switch reducer exported to Redux combineReducers
export const reducer = (
  state: AppState = initialState,
  action: ReducerPayload<AppActionTypes>
): AppState => {
  switch (action.type) {
    case AppActionTypes.actionFunction:
      return { ...state, property: action.payload };
    default:
      return state;
  }
};
```

### How to Dispatch

Within a component, import the actions and selectors needed.

```tsx
// Add type definition
interface MyComponentProps {
  actionFunction: typeof actionFunction;
}
// Connect to Redux store
const mapDispatchToProps = {
  actionFunction
};
// Example React Component connected to store
const MyComponent = ({ actionFunction }: MyComponentProps): JSX.Element => {
  const handleClick = () => {
    // Dispatch function
    actionFunction();
  };
  return <button onClick={handleClick}>freeCodeCamp is awesome!</button>;
};

export default connect(null, mapDispatchToProps)(MyComponent);
```

<!-- ### Redux Types File -->
<!-- The types associated with the Redux store state are located in `client/src/redux/types.ts`... -->

## API

### Testing

The `api/` tests are split into two parts:

1. Unit tests
2. Integration tests

#### Unit Tests

Unit tests isolate a single function or component. The tests do not need mocking, but will require fixtures.

The unit tests are located in a new file adjacent to the file exporting that is being tested:

```text
api/
├── src/
│   ├── utils.ts
│   ├── utils.test.ts
```

#### Integration Tests

Integration tests test the API as a whole. The tests will require mocking and should not require fixtures beyond the database seeding data and a method for authentication.

Typically, each integration test file will be directly related to a route. The integration tests are located in the `api/tests/` directory:

```text
api/
├── tests/
│   ├── settings.ts
```

## Further Literature

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TypeScript with React CheatSheet](https://github.com/typescript-cheatsheets/react#readme)
