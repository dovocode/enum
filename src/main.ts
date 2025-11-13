import {
  ERR_INVALID_ARRAY_OR_OBJECT,
  ERR_INVALID_OBJECT,
  ERR_INVALID_STRING_ARRAY,
  TYPE_PROP_ERROR,
} from "./error.js";

/**
 * A utility type that parses a string into a number.
 * @internal
 */
type ParseInt<T extends string> = T extends `${number}`
  ? T extends `${infer N extends number}`
    ? N
    : never
  : never;

export const values = Symbol("enum-values");
export const keys = Symbol("enum-keys");
export const type = Symbol("enum-type");
/**
 * Represents an enumerated type with readonly properties and an inferred value type.
 * @template R The type of the enum object
 */
export type EnumOf<R> = Readonly<R> & {
  [values]: R[keyof R][];
  [keys]: (keyof R)[];
  [type]: R[keyof R];
};

export type Enum<T extends EnumOf<Record<string, unknown>>> =
  T[typeof type] extends infer R ? R : never;

/**
 * Creates an enumerated object from an array of strings, where each string becomes a key mapped to its index.
 * @example
 * ```ts
 * const Colors = enumOf(['RED', 'GREEN', 'BLUE']);
 * Colors.RED; // 0
 * Colors.GREEN; // 1
 * Colors.BLUE; // 2
 * ```
 *
 * @example
 * ```ts
 * const Colors = enumOf({
 *   RED: 'red',
 *   GREEN: 'green',
 *   BLUE: 'blue'
 * });
 * Colors.RED; // 'red'
 * Colors.GREEN; // 'green'
 * Colors.BLUE; // 'blue'
 * ```
 */
export function enumOf<
  const T extends string[],
  const R extends {
    [P in keyof T as T[P] extends `${string}`
      ? `${T[P]}`
      : never]: P extends string ? ParseInt<P> : never;
  }
>(array: T): EnumOf<R>;
/**
 * Creates an enumerated object from a record mapping strings to numbers.
 * @example
 * ```ts
 * const Status = enumerate({
 *   PENDING: 0,
 *   ACTIVE: 1,
 *   INACTIVE: 2
 * });
 * ```
 */
export function enumOf<
  const T extends Record<string, number>,
  const R extends T
>(record: T): EnumOf<R>;
/**
 * Creates an enumerated object from a record mapping strings to strings.
 * @example
 * ```ts
 * const Roles = enumOf({
 *   ADMIN: 'admin',
 *   USER: 'user',
 *   GUEST: 'guest'
 * });
 * ```
 */
export function enumOf<
  const T extends Record<string, string>,
  const R extends T
>(record: T): EnumOf<R>;
export function enumOf<
  const T extends Record<string, string> | Record<string, number> | string[],
  const R extends T extends string[] ? { [P in T[number]]: keyof T } : T
>(record: T): EnumOf<R> {
  if (typeof record !== "object" || record === null) {
    throw new Error(ERR_INVALID_ARRAY_OR_OBJECT);
  }
  if (Array.isArray(record)) {
    if (
      record.some((item) => typeof item !== "string") ||
      record.length === 0
    ) {
      throw new Error(ERR_INVALID_STRING_ARRAY);
    }

    const enumObject = Object.fromEntries(
      record.map((key, index) => [key, index])
    );

    addEnumProperties(enumObject);
    return Object.freeze(enumObject) as EnumOf<R>;
  }

  if (
    Object.entries(record).some(
      ([key, value]) =>
        typeof key !== "string" ||
        (typeof value !== "string" && typeof value !== "number")
    ) ||
    Object.getOwnPropertyNames(record).length === 0
  ) {
    throw new Error(ERR_INVALID_OBJECT);
  }

  const enumObject = record as unknown as EnumOf<R>;
  addEnumProperties(enumObject);
  return Object.freeze(enumObject) as EnumOf<R>;
}

function addEnumProperties<T extends object, R extends EnumOf<T>>(
  obj: T
): void {
  Object.defineProperty(obj, values, {
    value: Object.values(obj) as R[keyof R][],
    enumerable: false,
  });
  Object.defineProperty(obj, keys, {
    value: Object.keys(obj) as (keyof R)[],
    enumerable: false,
  });
  Object.defineProperty(obj, type, {
    get() {
      throw new Error(TYPE_PROP_ERROR);
    },
    enumerable: false,
    configurable: false,
  });
}
