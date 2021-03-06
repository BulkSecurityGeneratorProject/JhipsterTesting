/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AssignmentService } from 'app/entities/assignment/assignment.service';
import { IAssignment, Assignment, GradingStyle, AssignmentType } from 'app/shared/model/assignment.model';

describe('Service Tests', () => {
    describe('Assignment Service', () => {
        let injector: TestBed;
        let service: AssignmentService;
        let httpMock: HttpTestingController;
        let elemDefault: IAssignment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AssignmentService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Assignment(0, 'AAAAAAA', 0, 0, 0, GradingStyle.BY_STUDENT, 'AAAAAAA', AssignmentType.HOMEWORK, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Assignment', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Assignment(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Assignment', async () => {
                const returnedFromService = Object.assign(
                    {
                        description: 'BBBBBB',
                        totalPoints: 1,
                        numParts: 1,
                        numSubmissions: 1,
                        gradeBy: 'BBBBBB',
                        gradingDirections: 'BBBBBB',
                        type: 'BBBBBB',
                        gradingLink: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Assignment', async () => {
                const returnedFromService = Object.assign(
                    {
                        description: 'BBBBBB',
                        totalPoints: 1,
                        numParts: 1,
                        numSubmissions: 1,
                        gradeBy: 'BBBBBB',
                        gradingDirections: 'BBBBBB',
                        type: 'BBBBBB',
                        gradingLink: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
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

            it('should delete a Assignment', async () => {
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
