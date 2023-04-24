import styled from 'styled-components';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Joke, JokeFormValues } from 'types/Joke';
import { Paragraph } from 'common/components/styled';

interface Props {
  joke?: Joke;
  onSubmit: (values: JokeFormValues) => void;
  onRemove?: (jokeId: number) => void;
  isSubmitting: boolean;
  isError: boolean;
}

function JokeForm({ joke, onSubmit, onRemove, isSubmitting, isError }: Props) {
  return (
    <Wrapper>
      <Formik<JokeFormValues>
        initialValues={{
          Title: joke?.Title || '',
          Author: joke?.Author || '',
          Body: joke?.Body || '',
          Views: joke?.Views || 0,
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {() => (
          <Form>
            <FieldWrapper>
              <label htmlFor="Title">Title</label>
              <Field id="Title" type="text" name="Title" />
              <ErrorMessage name="Title" component="div" />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="Author">Author</label>
              <Field id="Author" type="text" name="Author" />
              <ErrorMessage name="Author" component="div" />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="Views">Views</label>
              <Field id="Views" type="number" name="Views" min="0" />
              <ErrorMessage name="Views" component="div" />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="Body">Body</label>
              <Field as="textarea" rows="10" id="Body" name="Body" />
              <ErrorMessage name="Body" component="div" />
            </FieldWrapper>
            <ButtonsWrapper
              justifyContent={joke ? 'space-between' : 'flex-end'}
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
            </ButtonsWrapper>
          </Form>
        )}
      </Formik>
      {isError ? (
        <Paragraph color="red">
          Something went wrong. Please try again.
        </Paragraph>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const FieldWrapper = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    line-height: 1.5;
  }

  textarea {
    width: 100%;
  }
`;

const ButtonsWrapper = styled.div<{ justifyContent: string }>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

export default JokeForm;
