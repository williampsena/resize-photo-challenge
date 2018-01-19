import * as http from 'http';
import { should } from 'chai';

describe('External Url', () => {
    it('Getting json url', (done) => {
        http.get('http://54.152.221.29/images.json', (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                should().not.equal(body, '', 'Error on get json');
                done();
            });
        });
    });
});