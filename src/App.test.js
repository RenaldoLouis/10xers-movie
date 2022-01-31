// import Content from './components/Content';
import { Header } from './components/Header';
import { render, screen, cleanup } from '@testing-library/react'
require("babel-core/register");
require("babel-polyfill");

test('should render moviest list page', () => {
  const { queryByTestId } = render(<Header />);
  const contentElement = screen.getByTestId('header');
  expect(contentElement).toBeInTheDocument();
  // expect(queryByTestId("header")).toBeTruthy()
});
