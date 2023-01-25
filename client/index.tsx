import { CssVarsProvider } from '@mui/joy/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Card from './components/Card/Card';
import Headline from './components/Headline/Headline';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ChooseImageType from './components/Studio/ChooseImageType/ChooseImageType';
import Embellish from './components/Studio/Embellish/Embellish';
import FinishSend from './components/Studio/FinishSend/FinishSend';
import GenerateImage from './components/Studio/GenerateImage/GenerateImage';
import SelectImage from './components/Studio/SelectImage/SelectImage';
import Studio from './components/Studio/Studio/Studio';
import UploadImage from './components/Studio/UploadImage/UploadImage';
import CreateCard from './pages/CreateCardPage';
import ErrorPage from './pages/ErrorPage';
import GalleryPage from './pages/GalleryPage';
import LandingPage from './pages/LandingPage';
import './styles/index.scss';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Headline>Make Cards That Pop</Headline>,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/signup',
        element: <RegisterForm />,
      },
    ],
  },

  {
    path: '/cards',
    element: <GalleryPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/cards',
        element: <Headline>Gallery</Headline>, //TODO: Add gallery element here
      },
      {
        path: '/cards/create',
        element: <Studio />,
        children: [
          {
            path: '/cards/create/choose-image-type',
            element: <ChooseImageType />,
          },
          {
            path: '/cards/create/generate-image',
            element: <GenerateImage />,
          },
          {
            path: '/cards/create/select-image',
            element: <SelectImage />,
          },
          {
            path: '/cards/create/upload-image',
            element: <UploadImage />,
          },
          {
            path: '/cards/create/embellish',
            element: <Embellish />,
          },
          {
            path: '/cards/create/finish-send',
            element: <FinishSend />,
          },
        ],
      },
      {
        path: '/cards/1',
        element: (
          <Card
            data={{
              image: {
                src: 'https://picsum.photos/200',
                alt: 'random image',
              },
              backgroundColor: 'beige',
              banner: {
                enabled: true,
                color: 'white',
              },
              text: {
                front: {
                  value: 'Front Text',
                  color: 'black',
                  position: 'bottom',
                },
                back: {
                  value:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus recusandae, sequi molestias earum dolore ex voluptatem eius minus quia ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus recusandae, sequi molestias earum dolore ex voluptatem eius minus quia ad.',
                  color: 'black',
                },
              },
              texture: {
                pattern: 'none',
                intensity: 0.6,
              },
              id: '123',
              authorId: '123',
              ownerId: '123',
              createdAt: new Date(),
            }}
          />
        ),
      },
    ],
  },
  // {
  //   path: '/card',
  //   element: <CardViewPage />,
  // },
  {
    path: '/create',
    element: <CreateCard />,
  },
];
const element = document.querySelector('#App');
if (element === null) throw new Error('Root element not found');
const root = createRoot(element);

root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </CssVarsProvider>
  </React.StrictMode>
);
