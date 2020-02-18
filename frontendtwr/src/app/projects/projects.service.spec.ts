import {HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects.service';
import { HttpClientModule } from '@angular/common/http';

import {PGroup} from './project.model';
describe('ProjectsService', () => {
	let masterService: ProjectsService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [
				ProjectsService, 
			]
		});
	})
	const service: ProjectsService = TestBed.get(ProjectsService);
	const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('to be able to retrieve pgs', () => {
		const dummyPgs: PGroup[] = [
			{
				id: 'oen',
				pgroup: 'somepplgrp',
				agegrouplow: 12,
				agegrouphigh: 12,
				country: 'India',
				description: 'Bleh bleh bleh',
				population: 12,
				electricityaccess: 12,
				literacyrate: 12,
				averageincome: 12,
				location: 'Bleh bleh bleh',
				needs: [],
				projectnos: 1,
				maccess: 'Bleh'
			},
			{
				id: 'oen',
				pgroup: 'somepplgrp',
				agegrouplow: 12,
				agegrouphigh: 12,
				country: 'India',
				description: 'Bleh bleh bleh',
				population: 12,
				electricityaccess: 12,
				literacyrate: 12,
				averageincome: 12,
				location: 'Bleh bleh bleh',
				needs: [],
				projectnos: 1,
				maccess: 'Bleh'
			}
		]
			expect(service.getallpg().toEqual(dummyPgs));
		//const request  = httpMock.expectOne(`${service.project}/posts`);
		//expect(request.request.method).toBe('GET');
		//request.flush(dummyPgs);
	})
})
