using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemyPatrolScript : MonoBehaviour {

    public float patrolSpeed = 2f;
    public float patrolWaitTime = 1f;
    public Transform[] patrolWaypoints;

    private NavMeshAgent nav;
    private Transform player;
    private float patrolTimer;
    public int wayPointIndex; // First waypoint to move to.

    private LineRenderer debugTargetLine;

    private void Awake()
    {
        nav = GetComponent<NavMeshAgent>();
        debugTargetLine = GetComponent<LineRenderer>();
        debugTargetLine.useWorldSpace = true;
        debugTargetLine.SetPosition(1, patrolWaypoints[wayPointIndex].position);

        player = GameObject.FindGameObjectWithTag(Tags.player).transform;


    }
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        Patrolling();
    }

    void Melee()
    {

    }

    void Throw()
    {

    }

    void Chasing()
    {

    }

    void Patrolling()
    {
        nav.speed = patrolSpeed;

        debugTargetLine.SetPosition(0, transform.position);

        if (nav.remainingDistance <= nav.stoppingDistance) {

            patrolTimer += Time.deltaTime;

            if(patrolTimer >= patrolWaitTime)
            {
                // Go to next waypoint
                wayPointIndex = (wayPointIndex + 1) % patrolWaypoints.Length;
                patrolTimer = 0f;
                debugTargetLine.SetPosition(1, patrolWaypoints[wayPointIndex].position);
            }

            nav.destination = patrolWaypoints[wayPointIndex].position;



        }

    }
}
