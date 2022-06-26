import { render, screen } from '@testing-library/react'
import Statistic from './statistic'

test('renders learn react link', () => {
  render(<Statistic />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
