function validateDuplicates(row, lastTableRow) {
  const { errors } = this
  const { domain, range } = row

  // Check if domain + range already exist
  if (domain === lastTableRow.domain && range === lastTableRow.range) {
    errors.duplicate = true
  }
}

function validateForks(row, lastTableRow) {
  const { errors } = this
  const { domain } = row

  // Check if domain already exists
  if (domain === lastTableRow.domain) {
    errors.fork = true
  }
}

function validateCycles(row, lastTableRow) {
  const { errors } = this
  const { domain, range } = row

  // Check if current domain is equal to last table item range and vice-versa
  if (domain === lastTableRow.range && range === lastTableRow.domain) {
    errors.cycle = true
  }
}

function validateChains(row, lastTableRow) {
  const { errors } = this
  const { domain, range } = row

  // Check if current domain is equal to last table item range or vice-versa
  if (domain === lastTableRow.range || range === lastTableRow.domain) {
    errors.chain = true
  }
}

export default function validateDictionary(dictionary) {
  const errors = {
    duplicate: false,
    fork: false,
    cycle: false,
    chain: false,
  }

  const table = dictionary.table
  const lastTableRow = table[table.length - 1]

  table.forEach((row, index) => {
    // Don't run if current item is the last item
    if (index !== table.length - 1) {
      validateDuplicates.call({ errors }, row, lastTableRow)
      validateForks.call({ errors }, row, lastTableRow)
      validateCycles.call({ errors }, row, lastTableRow)
      validateChains.call({ errors }, row, lastTableRow)
    }
  })

  return errors
}
