import { useTranslation } from "react-i18next";

function Navbar(){

const { i18n } = useTranslation();

return (

<div className="flex justify-between p-4 shadow">

<h1 className="font-bold text-xl">AgriPulse</h1>

<select
onChange={(e)=>i18n.changeLanguage(e.target.value)}
className="border rounded p-1"
>

<option value="en">English</option>
<option value="hi">हिंदी</option>
<option value="mr">मराठी</option>

</select>

</div>

);

}

export default Navbar;