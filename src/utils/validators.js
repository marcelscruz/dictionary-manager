import capitalise from 'utils/capitalise'
import { errors } from 'utils/constants'

const { DUPLICATE, FORK, CYCLE, CHAIN } = errors

function validateDuplicates(
  { outerDomain, outerRange },
  { innerDomain, innerRange },
) {
  const { errors } = this

  // Check if domain + range already exist
  if (outerDomain === innerDomain && outerRange === innerRange) {
    errors[DUPLICATE] = true
  }
}

function validateForks(
  { outerDomain, outerRange },
  { innerDomain, innerRange },
) {
  const { errors } = this

  // Check if domain already exists
  if (outerDomain === innerDomain && outerRange !== innerRange) {
    errors[FORK] = true
  }
}

function validateCycles(
  { outerDomain, outerRange },
  { innerDomain, innerRange },
) {
  const { errors } = this

  // Check if current domain is equal to last table item range and vice-versa
  if (outerDomain === innerRange && outerRange === innerDomain) {
    errors[CYCLE] = true
  }
}

function validateChains(
  { outerDomain, outerRange },
  { innerDomain, innerRange },
) {
  const { errors } = this

  // Check if current domain is equal to last table item range or vice-versa
  if (outerDomain === innerRange || outerRange === innerDomain) {
    errors[CHAIN] = true
  }
}

export default function(outerRow, table, outerIndex) {
  const errors = {
    [DUPLICATE]: false,
    [FORK]: false,
    [CYCLE]: false,
    [CHAIN]: false,
  }

  // Compare row passed as parameter to all other rows, except itself
  table.forEach((innerRow, innerIndex) => {
    // Skip if it's comparing the same row
    if (outerIndex === innerIndex) return

    const outerDomain = capitalise(outerRow.domain)
    const outerRange = capitalise(outerRow.range)
    const innerDomain = capitalise(innerRow.domain)
    const innerRange = capitalise(innerRow.range)

    // Skip if any of the values is empty, so validation
    // only occurs when both fields have values
    if (!outerDomain || !outerRange || !innerDomain || !innerRange) return

    validateDuplicates.call(
      { errors },
      { outerDomain, outerRange },
      { innerDomain, innerRange },
    )
    validateForks.call(
      { errors },
      { outerDomain, outerRange },
      { innerDomain, innerRange },
    )
    validateCycles.call(
      { errors },
      { outerDomain, outerRange },
      { innerDomain, innerRange },
    )
    validateChains.call(
      { errors },
      { outerDomain, outerRange },
      { innerDomain, innerRange },
    )
  })

  // Check if any error key has a truthy value
  const hasError = Object.values(errors).some(error => error)

  return hasError && errors
}
