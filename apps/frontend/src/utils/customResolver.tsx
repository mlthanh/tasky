import { Resolver } from 'react-hook-form';
import { z } from 'zod';

export function customResolver<TSchema extends z.ZodType<any, any>>(
  schema: TSchema
): Resolver<z.infer<TSchema>> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {}
      };
    }

    const formErrors = result.error.errors.reduce((allErrors, currentError) => {
      const path = currentError.path[0] as string;
      allErrors[path] = {
        type: currentError.code,
        message: currentError.message
      };
      return allErrors;
    }, {} as Record<string, any>);

    return {
      values: {},
      errors: formErrors
    };
  };
}
