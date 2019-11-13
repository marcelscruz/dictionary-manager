function validateDuplicates(outerRow, innerRow) {
  const { errors } = this
  const { domain: outerDomain, range: outerRange } = outerRow
  const { domain: innerDomain, range: innerRange } = innerRow

  // Check if domain + range already exist
  if (outerDomain === innerDomain && outerRange === innerRange) {
    errors.duplicate = true
  }
}

function validateForks(outerRow, innerRow) {
  const { errors } = this
  const { domain: outerDomain } = outerRow
  const { domain: innerDomain } = innerRow

  // Check if domain already exists
  if (outerDomain === innerDomain) {
    errors.fork = true
  }
}

function validateCycles(outerRow, innerRow) {
  const { errors } = this
  const { domain: outerDomain, range: outerRange } = outerRow
  const { domain: innerDomain, range: innerRange } = innerRow

  // Check if current domain is equal to last table item range and vice-versa
  if (outerDomain === innerRange && outerRange === innerDomain) {
    errors.cycle = true
  }
}

function validateChains(outerRow, innerRow) {
  const { errors } = this
  const { domain: outerDomain, range: outerRange } = outerRow
  const { domain: innerDomain, range: innerRange } = innerRow

  // Check if current domain is equal to last table item range or vice-versa
  if (outerDomain === innerRange || outerRange === innerDomain) {
    errors.chain = true
  }
}

export default function validateDictionary(outerRow, table, outerIndex) {
  const errors = {
    duplicate: false,
    fork: false,
    cycle: false,
    chain: false,
  }

  // Compare row passed as parameter to all other rows, except itself
  table.forEach((innerRow, innerIndex) => {
    // Skip if it's comparing the same row
    if (outerIndex === innerIndex) return

    validateDuplicates.call({ errors }, outerRow, innerRow)
    validateForks.call({ errors }, outerRow, innerRow)
    validateCycles.call({ errors }, outerRow, innerRow)
    validateChains.call({ errors }, outerRow, innerRow)
  })

  // Check if any error key has a truthy value
  const hasError = Object.values(errors).some(error => error)

  return hasError && errors
}
