import { IBreed } from '@paws-and-redux/shared-state';

export const setBreedImages = (breeds: IBreed[], imageUrls: string[], breedName: string, parentBreed?: string): IBreed[] => {
  const breedIndex = breeds.findIndex(breed => breed.name === breedName && breed.parentBreed === parentBreed);
  if (breedIndex  === -1) {
    return breeds;
  }
  const breed = breeds[breedIndex];
  return [
    ...breeds.slice(0, breedIndex),
    {
      ...breed,
      imageUrls: [...imageUrls],
      defaultImageUrl: imageUrls.length ? imageUrls[0] : undefined
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
