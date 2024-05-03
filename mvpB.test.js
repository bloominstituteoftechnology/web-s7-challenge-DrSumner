import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */
test('[1] throws error if not numbers', () => {
  const message = 'pass valid numbers'
  expect(() => sum()).toThrow(message)
})
test('[2] throws error if not numbers', () => {
  const message = 'pass valid numbers'
  expect(() => sum(2, 'seven')).toThrow(message)
})
test('[3] gives correct sum', () => {
  const result = sum(1, 3)
  expect(result).toEqual(4)
})
test('[3] gives correct sum', () => {
  const result = sum('1', 2)
  expect(result).toEqual(3)
})
test('[3] gives correct sum', () => {
  const result = sum('10', '3')
  expect(result).toEqual(13)
})
  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */

    test('[1] renders a link that reads "Home"', () => {
      render(<HelloWorld/>)
      const link = screen.queryByText('Home', { exact: false })
      expect(link).toBeInTheDocument()
    })
    test('[2] renders a link that reads "About"', () => {
      render(<HelloWorld/>)
      const link = screen.queryByText('About', { exact: false })
      expect(link).toBeInTheDocument()
    })
    test('[3] renders a link that reads "Blog"', () => {
      render(<HelloWorld/>)
      const link = screen.queryByText('Blog', { exact: false })
      expect(link).toBeInTheDocument()
    })
    test('[4] renders a link that reads "The Truth"', () => {
      render(<HelloWorld/>)
      const link = screen.queryByText('The Truth', { exact: false })
      expect(link).toBeInTheDocument()
    })
    test('[5] renders a link that reads "JavaScript is pretty awesome"', () => {
      render(<HelloWorld/>)
      const link = screen.queryByText('JavaScript is pretty awesome', { exact: false })
      expect(link).toBeInTheDocument()
    })
    test('[6] renders a link that reads "javaScript is pretty"', () => {
      render(<HelloWorld/>)
      const link = screen.queryByText('javaScript is pretty', { exact: false })
      expect(link).toBeInTheDocument()
    })
    
  // test('you can comment out this test', () => {
  //   expect(true).toBe(false)
  // })
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
