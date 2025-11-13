import { describe, expect, it } from "vitest";
import { enumOf, keys, type, values } from "./main.js";
import {
  TYPE_PROP_ERROR,
  ERR_INVALID_ARRAY_OR_OBJECT,
  ERR_INVALID_OBJECT,
  ERR_INVALID_STRING_ARRAY,
} from "./error.js";

describe("enumerate", () => {
  it("creates an enum from an array of strings", () => {
    const result = enumOf(["foo", "bar", "baz"]);

    expect(result).toStrictEqual({ foo: 0, bar: 1, baz: 2 });
    expect(result).not.toStrictEqual({
      foo: 0,
      bar: 1,
      baz: 2,
      [values]: [0, 1, 2],
    });
    expect(result[keys]).toStrictEqual(["foo", "bar", "baz"]);
    expect(result[values]).toStrictEqual([0, 1, 2]);
    expect(result.foo).toBe(0);
    expect(result.bar).toBe(1);
    expect(result.baz).toBe(2);

    expect(() => result[type]).toThrowError(TYPE_PROP_ERROR);
  });

  it("creates an enum from a record of strings", () => {
    const result = enumOf({ foo: "foo", bar: "bar", baz: "baz" });

    expect(result).toStrictEqual({ foo: "foo", bar: "bar", baz: "baz" });
    expect(result[keys]).toStrictEqual(["foo", "bar", "baz"]);
    expect(result[values]).toStrictEqual(["foo", "bar", "baz"]);
    expect(result.foo).toBe("foo");
    expect(result.bar).toBe("bar");
    expect(result.baz).toBe("baz");

    expect(() => result[type]).toThrowError(TYPE_PROP_ERROR);
  });

  it("creates an enum from a record of numbers", () => {
    const result = enumOf({ foo: 0, bar: 1, baz: 2 });

    expect(result).toStrictEqual({ foo: 0, bar: 1, baz: 2 });
    expect(result[keys]).toStrictEqual(["foo", "bar", "baz"]);
    expect(result[values]).toStrictEqual([0, 1, 2]);
    expect(result.foo).toBe(0);
    expect(result.bar).toBe(1);
    expect(result.baz).toBe(2);

    expect(() => result[type]).toThrowError(TYPE_PROP_ERROR);
  });

  describe("throws for invalid enum definitions", () => {
    it("throws if the input is not an array or object", () => {
      expect(() => enumOf(1 as unknown as string[])).toThrowError(
        ERR_INVALID_ARRAY_OR_OBJECT
      );
      expect(() =>
        enumOf("100" as unknown as Record<string, string>)
      ).toThrowError(ERR_INVALID_ARRAY_OR_OBJECT);
      expect(() => enumOf(true as unknown as string[])).toThrowError(
        ERR_INVALID_ARRAY_OR_OBJECT
      );
    });

    it("throws for an empty object or a non-enum object", () => {
      expect(() => enumOf({} as unknown as string[])).toThrowError(
        ERR_INVALID_OBJECT
      );
      expect(() =>
        enumOf(new Date() as unknown as Record<string, string>)
      ).toThrowError(ERR_INVALID_OBJECT);
    });

    it("throws for an array with non-string values", () => {
      expect(() => enumOf([1, 2, 3] as unknown as string[])).toThrowError(
        ERR_INVALID_STRING_ARRAY
      );
    });

    it("throws for an empty array", () => {
      expect(() => enumOf([] as unknown as string[])).toThrowError(
        ERR_INVALID_STRING_ARRAY
      );
    });
  });
});
