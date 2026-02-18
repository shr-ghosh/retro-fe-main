import { z } from "zod";

const NumberStringSchema = z
  .object({
    input: z.number(),
    minValue: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Min value must be a valid number string",
    }),
    maxValue: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Max value must be a valid number string",
    }),
  })
  .refine((data) => Number(data.minValue) <= Number(data.maxValue), {
    message: "Min value cannot be greater than max value",
  })
  .refine(
    (data) => {
      const input = data.input;
      const min = Number(data.minValue);
      const max = Number(data.maxValue);
      return input >= min && input <= max;
    },
    {
      message: "Input is not within the specified range",
    }
  );

export const validateNumberString = (
  input: number,
  minValue: string,
  maxValue: string
): { value: number; warning?: string; error?: string } => {
  try {
    const result = NumberStringSchema.parse({ input, minValue, maxValue });
    return { value: result.input };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { value: input, warning: error.errors[0].message };
    }
    return { value: input, error: "An unexpected error occurred" };
  }
};
