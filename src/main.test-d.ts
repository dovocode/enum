import { describe, expectTypeOf, it } from "vitest";
import type { Enum, EnumOf } from "./main.js";
import { enumOf, keys, values, type } from "./main.js";
describe("enumerate", () => {
  it("should create an enum from an array of strings", () => {
    // Act
    const enumConst = enumOf(["foo", "bar", "baz"]);

    // Assert
    expectTypeOf(enumConst).toEqualTypeOf<EnumOf<{ foo: 0; bar: 1; baz: 2 }>>();
    expectTypeOf(enumConst.foo).toEqualTypeOf<0>();
    expectTypeOf(enumConst.bar).toEqualTypeOf<1>();
    expectTypeOf(enumConst.baz).toEqualTypeOf<2>();
    expectTypeOf<(typeof enumConst)[typeof type]>().toEqualTypeOf<0 | 1 | 2>();
    expectTypeOf<Enum<typeof enumConst>>().toEqualTypeOf<0 | 1 | 2>();
    expectTypeOf(enumConst[keys]).toEqualTypeOf<("foo" | "bar" | "baz")[]>();
    expectTypeOf(enumConst[values]).toEqualTypeOf<(0 | 1 | 2)[]>();
  });

  it("should create an enum from a record of strings", () => {
    // Act
    const enumConst = enumOf({ foo: "foo", bar: "bar", baz: "baz" });

    // Assert
    expectTypeOf(enumConst).toEqualTypeOf<
      EnumOf<{ foo: "foo"; bar: "bar"; baz: "baz" }>
    >();
    expectTypeOf(enumConst.foo).toEqualTypeOf<"foo">();
    expectTypeOf(enumConst.bar).toEqualTypeOf<"bar">();
    expectTypeOf(enumConst.baz).toEqualTypeOf<"baz">();
    expectTypeOf<(typeof enumConst)[typeof type]>().toEqualTypeOf<
      "foo" | "bar" | "baz"
    >();
    expectTypeOf<Enum<typeof enumConst>>().toEqualTypeOf<
      "foo" | "bar" | "baz"
    >();
    expectTypeOf(enumConst[values]).toEqualTypeOf<("foo" | "bar" | "baz")[]>();
    expectTypeOf(enumConst[keys]).toEqualTypeOf<("foo" | "bar" | "baz")[]>();
  });

  it("should create an enum from a record of numbers", () => {
    // Act
    const enumConst = enumOf({ foo: 0, bar: 1, baz: 2 });

    // Assert
    expectTypeOf(enumConst).toEqualTypeOf<EnumOf<{ foo: 0; bar: 1; baz: 2 }>>();
    expectTypeOf(enumConst.foo).toEqualTypeOf<0>();
    expectTypeOf(enumConst.bar).toEqualTypeOf<1>();
    expectTypeOf(enumConst.baz).toEqualTypeOf<2>();
    expectTypeOf<(typeof enumConst)[typeof type]>().toEqualTypeOf<0 | 1 | 2>();
    expectTypeOf<Enum<typeof enumConst>>().toEqualTypeOf<0 | 1 | 2>();
    expectTypeOf(enumConst[values]).toEqualTypeOf<(0 | 1 | 2)[]>();
    expectTypeOf(enumConst[keys]).toEqualTypeOf<("foo" | "bar" | "baz")[]>();
  });
});
