const FilterButton = ({ label, activeFilter, setActiveFilter }) => {
  return (
    <button
      className={`px-2 py-1 text-sm rounded-md  ${activeFilter === label ? 'bg-gray-200' : 'hover:bg-gray-50'} cursor-pointer`}
      onClick={() => setActiveFilter(label)}
    >
      {label}
    </button>
  )
}

export default FilterButton