import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function HomePage(){

const { t } = useTranslation();
const navigate = useNavigate();

return(

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

<h1 className="text-4xl font-bold mb-8">
{t("app_name")}
</h1>

<button
onClick={() => navigate("/dashboard")}
className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
>

{t("select_crop")}

</button>

</div>

);

}

export default HomePage;