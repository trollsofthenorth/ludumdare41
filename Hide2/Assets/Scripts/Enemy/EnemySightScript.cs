using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class SkeletonControllerScript : MonoBehaviour {


    public Transform target; // Walk toward this target.position
    public float fieldOfViewAngle = 110f;
    public bool playerInSight = false;
    public Vector3 personalLastSighting;

    private NavMeshAgent agent;
    private SphereCollider sightCollider;
    private CapsuleCollider touchCollider;


}
