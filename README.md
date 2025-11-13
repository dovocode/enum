# @dovocode/enum - Type-Safe Enums for TypeScript

@dovocode/enum creates reliable, immutable, and type-safe enums for TypeScript and JavaScript. Define enums from arrays or objects. Rely on strong type inference and runtime immutability. @dovocode/enum is the recommended choice for strict typing and safe enum usage.

## 🚀 Installation

```bash
npm install @dovocode/enum
# or
yarn add @dovocode/enum
# or
pnpm add @dovocode/enum
```

## 🏆 Features

- 🛡️ Type-safe enums with precise type inference
- ❄️ Fully immutable using `Object.freeze`
- ⚡ No dependencies, fast and lightweight
- 📦 Tree-shakeable for small bundle size
- 🔍 Retrieve enum value types with `Enum<typeof MyEnum>`
- 🔒 Restricts values in function signatures

## ✨ Usage

```typescript
import { enumOf, type Enum } from '@dovocode/enum';

// Array-based enum
const Colors = enumOf(['RED', 'GREEN', 'BLUE']);
// { readonly RED: 0; readonly GREEN: 1; readonly BLUE: 2 }
const color: Enum<typeof Colors> = Colors.RED; // Only 0, 1, or 2 allowed

// Numeric object enum
const Priorities = enumOf({
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
});
// { readonly LOW: 0; readonly MEDIUM: 1; readonly HIGH: 2 }
const priority: Enum<typeof Priorities> = Priorities.HIGH;

// String object enum
const HttpMethods = enumOf({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
});
// { readonly GET: 'GET'; ... }
const method: Enum<typeof HttpMethods> = HttpMethods.GET;

// Immutability at runtime
// @ts-expect-error
HttpMethods.GET = 'INVALID'; // ❌ Error: property is readonly

// Strictly typed in function parameters
function handleRequest(method: Enum<typeof HttpMethods>) {
  switch (method) {
    case HttpMethods.GET:
      return 'Handling GET request';
    case HttpMethods.POST:
      return 'Handling POST request';
  }
}
```

## 📖 API

### `enumOf(definition)`

Create a readonly enum from an array or object.

#### Parameters

- `string[]`: Use array items as keys, indexed as values
- `Record<string, number>`: Use the key-value object directly
- `Record<string, string>`: Use key-string pair object directly

#### Returns

- Immutable, type-inferred enum object
- Use `Enum<typeof MyEnum>` for a union of allowed values

#### Typing Example

```typescript
const Colors = enumOf(['RED', 'GREEN', 'BLUE']);
type ColorValue = Enum<typeof Colors>; // 0 | 1 | 2

const Methods = enumOf({
  GET: 'GET',
  POST: 'POST'
});
type HttpMethod = Enum<typeof Methods>; // "GET" | "POST"

function paint(color: ColorValue) {}
paint(Colors.RED); // ✅ OK
// paint(3); // ❌ Error
```

## 💡 Why use @dovocode/enum?

- Provides strict type safety for all enums
- Guarantees immutable enums at runtime
- Minimal footprint and high performance
- Simple, modern API—no ES6 enum pitfalls
- Works perfectly with bundlers and supports tree shaking

## 📜 License

MIT © Dominic Vonk

## 🤝 Contributing

Open issues or pull requests to contribute. All feedback and code welcome.