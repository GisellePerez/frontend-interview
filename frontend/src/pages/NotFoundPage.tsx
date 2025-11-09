import { Link } from "react-router-dom";
import { Container } from "../components/container/container";
import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div
        className='flex flex-col items-center justify-center min-h-[60vh] gap-4'
        data-testid='not-found-page'
      >
        <h1
          className='text-6xl font-bold text-gray-800'
          data-testid='not-found-title'
        >
          404
        </h1>
        <h2
          className='text-2xl font-semibold text-gray-700'
          data-testid='not-found-subtitle'
        >
          {t("notFound.title")}
        </h2>
        <p
          className='text-gray-600 text-center'
          data-testid='not-found-message'
        >
          {t("notFound.message")}
        </p>
        <Link
          to='/'
          className='mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
          data-testid='not-found-back-button'
        >
          {t("notFound.backButton")}
        </Link>
      </div>
    </Container>
  );
};
