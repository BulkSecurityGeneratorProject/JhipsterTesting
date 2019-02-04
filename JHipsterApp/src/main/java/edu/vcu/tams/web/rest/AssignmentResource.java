package edu.vcu.tams.web.rest;
import edu.vcu.tams.domain.Assignment;
import edu.vcu.tams.repository.AssignmentRepository;
import edu.vcu.tams.web.rest.errors.BadRequestAlertException;
import edu.vcu.tams.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Assignment.
 */
@RestController
@RequestMapping("/api")
public class AssignmentResource {

    private final Logger log = LoggerFactory.getLogger(AssignmentResource.class);

    private static final String ENTITY_NAME = "assignment";

    private final AssignmentRepository assignmentRepository;

    public AssignmentResource(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    /**
     * POST  /assignments : Create a new assignment.
     *
     * @param assignment the assignment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assignment, or with status 400 (Bad Request) if the assignment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assignments")
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) throws URISyntaxException {
        log.debug("REST request to save Assignment : {}", assignment);
        if (assignment.getId() != null) {
            throw new BadRequestAlertException("A new assignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Assignment result = assignmentRepository.save(assignment);
        return ResponseEntity.created(new URI("/api/assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /assignments : Updates an existing assignment.
     *
     * @param assignment the assignment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated assignment,
     * or with status 400 (Bad Request) if the assignment is not valid,
     * or with status 500 (Internal Server Error) if the assignment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/assignments")
    public ResponseEntity<Assignment> updateAssignment(@RequestBody Assignment assignment) throws URISyntaxException {
        log.debug("REST request to update Assignment : {}", assignment);
        if (assignment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Assignment result = assignmentRepository.save(assignment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, assignment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assignments : get all the assignments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of assignments in body
     */
    @GetMapping("/assignments")
    public List<Assignment> getAllAssignments() {
        log.debug("REST request to get all Assignments");
        return assignmentRepository.findAll();
    }

    /**
     * GET  /assignments/:id : get the "id" assignment.
     *
     * @param id the id of the assignment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assignment, or with status 404 (Not Found)
     */
    @GetMapping("/assignments/{id}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable Long id) {
        log.debug("REST request to get Assignment : {}", id);
        Optional<Assignment> assignment = assignmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(assignment);
    }

    /**
     * DELETE  /assignments/:id : delete the "id" assignment.
     *
     * @param id the id of the assignment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        log.debug("REST request to delete Assignment : {}", id);
        assignmentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
