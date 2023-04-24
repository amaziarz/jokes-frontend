import styled from 'styled-components';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Joke } from 'types/Joke';

export type JokeFormValues = Pick<Joke, 'Title' | 'Body' | 'Author'>;

interface Props {
  joke?: Joke;
  onSubmit: (values: JokeFormValues) => void;
  onRemove?: (jokeId: number) => void;
  isSubmitting: boolean;
}

function JokeForm({ joke, onSubmit, onRemove, isSubmitting }: Props) {
  return (
    <Wrapper>
      <Formik<JokeFormValues>
        initialValues={{
          Title: joke?.Title || '',
          Author: joke?.Author || '',
          Body: joke?.Body || '',
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 600px;
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
