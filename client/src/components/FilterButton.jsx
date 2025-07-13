const FilterButton = ({ active, label }) => {
  return (
    <p
      className={`px-2 py-1 rounded-md  ${active === label ? 'bg-gray-200' : 'hover:bg-gray-50'
        }`}
    >
      {label}
    </p>
  )
}

export default FilterButton