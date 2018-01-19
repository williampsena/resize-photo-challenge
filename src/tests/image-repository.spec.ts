import * as http from 'http';
import { should } from 'chai';
import { PhotoRepository } from '../seed/components/external/photo-repository';
import { PhotoDTO } from '../seed/components/external/dto/main';

describe('ImageRepository', () => {
    let externalImages: PhotoDTO;

    it('Get all images using PhotoRepository', (done) => {
        const repository = new PhotoRepository();

        repository.getAll().then(body => {
            should().not.equal(typeof (body), typeof (undefined), 'Error on get json');
            externalImages = body;
            done();
        });
    });

    it('Get image by Url', (done) => {
        const repository = new PhotoRepository();

        const imageUrl = externalImages.images[0].url;

        repository.getByUrl(imageUrl).then(imageBase64 => {
            should().not.equal(typeof (imageBase64), typeof (String), 'Error on get json');
            done();
        });
    });
});