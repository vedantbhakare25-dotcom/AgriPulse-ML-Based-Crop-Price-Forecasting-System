import { useTranslation } from "react-i18next";

function HomePage(){

const { t } = useTranslation();

return(

<div>

<h1>{t("app_name")}</h1>

<button>
{t("select_crop")}
</button>

</div>

);

}