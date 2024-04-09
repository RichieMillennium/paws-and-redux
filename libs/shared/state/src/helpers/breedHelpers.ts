import { IBreed } from '../types';

export const findBreedIndex = (breeds: IBreed[], breedName: string, parentBreed?: string): number =>
  breeds.findIndex(breed => breed.name === breedName && breed.parentBreed === parentBreed);

export const setBreedImages = (breeds: IBreed[], imageUrls: string[], breedName: string, parentBreed?: string): IBreed[] => {
  const breedIndex = findBreedIndex(breeds, breedName, parentBreed);
  if (breedIndex  === -1) {
    return breeds;
  }
  const breed = breeds[breedIndex];
  return [
    ...breeds.slice(0, breedIndex),
    {
      ...breed,
      imageUrls: [...imageUrls],
      galleryImageUrl: imageUrls.length ? imageUrls[0] : undefined
    },
    ...breeds.slice(breedIndex + 1),
  ];
};

export const breedsAreEqual = (a: IBreed) => (b: IBreed): boolean =>
  a.name === b.name && a.parentBreed === b.parentBreed

export const updateBreedsCache = (currentCache: IBreed[], newBreeds: IBreed[]): IBreed[] => {
  if (currentCache.length === 0) {
    return [...newBreeds];
  }
  return newBreeds.reduce((accum, newBreed) => {
    const existingBreed = accum.find(breedsAreEqual(newBreed));
    if (existingBreed) {
      return accum;
    }
    accum.push(newBreed);
    return accum;
  }, [...currentCache]);
}

export const sortBreeds = (breeds: IBreed[]): IBreed[] => {
  breeds.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return breeds;
}

export const breedMatchesSearchTerm = (breed: IBreed, searchTerm: string) => {
  if (!searchTerm) {
    return true;
  }
  const term = searchTerm.toLowerCase();
  return breed.name.includes(term) || breed.parentBreed?.includes(term);
}
