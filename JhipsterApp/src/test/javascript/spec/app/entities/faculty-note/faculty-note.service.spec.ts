/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { FacultyNoteService } from 'app/entities/faculty-note/faculty-note.service';
import { IFacultyNote, FacultyNote } from 'app/shared/model/faculty-note.model';

describe('Service Tests', () => {
    describe('FacultyNote Service', () => {
        let injector: TestBed;
        let service: FacultyNoteService;
        let httpMock: HttpTestingController;
        let elemDefault: IFacultyNote;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FacultyNoteService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new FacultyNote(0, currentDate, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        createdOn: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a FacultyNote', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        createdOn: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdOn: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new FacultyNote(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FacultyNote', async () => {
                const returnedFromService = Object.assign(
                    {
                        createdOn: currentDate.format(DATE_TIME_FORMAT),
                        noteText: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        createdOn: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of FacultyNote', async () => {
                const returnedFromService = Object.assign(
                    {
                        createdOn: currentDate.format(DATE_TIME_FORMAT),
                        noteText: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdOn: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a FacultyNote', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
