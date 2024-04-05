import {apiGet, getCancelTokenSource} from './base';

const ALL_DOGS_URL = 'https://dog.ceo/api/breeds/list/all';
const SUCCESS_STATUS = 'success';

interface IBreedsResponse {
  status?: string;
  message?: Record<string, string[]>;
}

interface IBreedImagesResponse {
  status?: string;
  message?: string[];
}

const getBreedImagesUrl = (breed: string) =>
  `https://dog.ceo/api/breed/${breed}/images`;

const getSubBreedImagesUrl = (breed: string, subBreed: string) =>
  `https://dog.ceo/api/breed/${breed}/${subBreed}/images`;

export const fetchAllBreeds = async () => {
  try {
    const cancelTokenSource = getCancelTokenSource();
    const {data} = await apiGet<IBreedsResponse>(ALL_DOGS_URL, cancelTokenSource.token);
    if (data?.status === SUCCESS_STATUS) {
      return {
        results: data?.message || {},
        cancel: cancelTokenSource.cancel
      };
    } else {
      return {
        error: 'There was a problem trying to find the dogs.'
      };
    }
  } catch (e) {
    return {
      error: e
    };
  }
};

export const fetchBreedImages = async (breed: string) => {
  try {
    const url = getBreedImagesUrl(breed);
    const { data } = await apiGet<IBreedImagesResponse>(url);
    if (data?.status === SUCCESS_STATUS) {
      return {
        results: data?.message || []
      };
    } else {
      return {
        error: 'There was a problem trying to find the dog images'
      }
    }
  } catch (e) {
    return {
      error: e
    }
  }
};

export const fetchSubBreedImages = async (breed: string, subBreed: string) => {
  try {
    const url = getSubBreedImagesUrl(breed, subBreed);
    const { data } = await apiGet<IBreedImagesResponse>(url);
    if (data?.status === SUCCESS_STATUS) {
      return {
        results: data?.message || []
      };
    } else {
      return {
        error: 'There was a problem trying to find the dog images'
      }
    }
  } catch (e) {
    return {
      error: e
    }
  }
};
