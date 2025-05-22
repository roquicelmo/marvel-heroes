export default function CardInfoHero({ icon, label, items }) {
  return (
    <div className="flex gap-6">
      <div className='flex items-center flex-4 gap-5 bg-gray-200 p-6 rounded-lg mb-0 text-md md:text-xl'>
        {icon ?? <></>}
        <div className='flex gap-3'>
          <label>{label}</label>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 bg-gray-200 p-6 rounded-lg font-bold mb-0 text-md md:text-xl">{items ?? '-'}</div>
    </div>
  )
}