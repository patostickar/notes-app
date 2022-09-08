import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Note from './Note';
import Togglable from './Toggable';

/*
There are two popular testing librarise built to use with Jest

> Enzyme:
It allows you to access the internal workings of your components.
You can read and set the state, and you can mock children to make tests run faster.

> react-testing-library:
It doesn't give you any access to the implementation details.
It renders the components and provides utility methods to interact with them.
The idea is that you should communicate with your application in the same way a user would.
So rather than set the state of a component you reproduce the actions a user would do to reach that state.
*/

describe('Note component', () => {
  it('renders content', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true,
    };

    render(<Note note={note} />);

    // Test fails if getByText does not find the element it is looking for.
    screen.getByText('Component testing is done with react-testing-library');
  });

  it('clicking the toggleImportance button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true,
    };

    const mockHandler = jest.fn();

    render(<Note note={note} toggleImportance={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText('make not important');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    //the object container  is one of the fields returned by the render:
    container = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv'>togglable content</div>
      </Togglable>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
