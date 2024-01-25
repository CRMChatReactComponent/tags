import { TagType } from "@/types";
import { faker } from "@faker-js/faker";

export function getTagsFakeData() {
  return Array.from(
    {
      length: faker.number.int({
        min: 1,
        max: 100,
      }),
    },
    (_, index) => {
      return {
        id: String(index),
        label: faker.commerce.productName().slice(0, 10),
        backgroundColor: faker.color.rgb(),
      } as TagType;
    },
  );
}
