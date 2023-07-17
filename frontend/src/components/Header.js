import { MdPerson, MdNotifications, MdEmail } from "react-icons/md";

export function Header(props) {
  return (
    <header className="flex">
      <div className="flex items-center justify-between bg-white text-secondary rounded-full px-7 py-4 ml-auto">
        <span className="font-bold font-poppins">{props.nama}</span>
        <div className="ml-6">
          <span className="inline-block">
            <MdPerson size={20} />
          </span>
          <span className="inline-block mx-3">
            <MdEmail size={20} />
          </span>
          <span className="inline-block">
            <MdNotifications size={20} />
          </span>
        </div>
      </div>
    </header>
  );
}
