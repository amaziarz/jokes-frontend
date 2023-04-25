import styled from 'styled-components';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { number, object, ObjectSchema, string } from 'yup';
import { Joke, JokeFormValues } from 'types/Joke';
import { Paragraph } from 'common/components/styled';

const validationSchema: ObjectSchema<JokeFormValues> = object({
  Title: string().required(),
  Author: string().email().required(),
  Body: string().required(),
  Views: number().required(),
});

interface Props {
  joke?: Joke;
  onSubmit: (values: JokeFormValues) => void;
  onRemove?: (jokeId: number) => void;
  isSubmitting: boolean;
  isError: boolean;
}

function JokeForm({ joke, onSubmit, onRemove, isSubmitting, isError }: Props) {
  return (
    <div css="width: 100%;">
      <Formik<JokeFormValues>
        initialValues={{
          Title: joke?.Title || '',
          Author: joke?.Author || '',
          Body: joke?.Body || '',
          Views: joke?.Views || 0,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <FieldWrapper>
              <label htmlFor="Title">Title</label>
              <Field id="Title" type="text" name="Title" />
              <JokeFormError name="Title" />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="Author">Author</label>
              <Field id="Author" type="text" name="Author" />
              <JokeFormError name="Author" />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="Views">Views</label>
              <Field id="Views" type="number" name="Views" min="0" />
              <JokeFormError name="Views" />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="Body">Body</label>
              <Field as="textarea" rows="10" id="Body" name="Body" />
              <JokeFormError name="Body" />
            </FieldWrapper>
            <div
              css={`
                display: flex;
                justify-content: ${joke ? 'space-between' : 'flex-end'};
              `}
            >
              {joke ? (
                <button
                  type="button"
                  onClick={() => onRemove?.(joke.id)}
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              ) : null}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {isError ? (
        <Paragraph color="red">
          Something went wrong. Please try again.
        </Paragraph>
      ) : null}
    </div>
  );
}

const FieldWrapper = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    line-height: 1.5;
  }

  input {
    width: 15rem;
    max-width: 100%;
    padding: 0.5rem;
  }

  textarea {
    width: 100%;
    padding: 0.5rem;
  }
`;

interface JokeFormErrorProps {
  name: keyof JokeFormValues;
}

function JokeFormError({ name }: JokeFormErrorProps) {
  return <ErrorMessage name={name} component="div" css="color: red;" />;
}

export default JokeForm;
