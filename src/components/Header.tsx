export default function Header() {
  return (
    <header className="bg-red-500">
      <div className="w-[1200px] bg-red-500 mx-auto flex items-center gap-4 justify-center py-2">
        <div className="w-[50px]">
          <img src="./anhhtus-logo 2.png" alt="" />
        </div>
        <div className="flex-1">
          <input
            className="w-full rounded-md border-none outline-none p-2"
            placeholder="Search.."
            type="text"
          />
        </div>
      </div>
    </header>
  );
}
