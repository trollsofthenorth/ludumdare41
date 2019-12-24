using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemySightScript : MonoBehaviour {


    public Transform target; // Walk toward this target.position
    public float fieldOfViewAngle = 110f;
    public bool playerInSight = false;
    public Vector3 personalLastSighting;

    private NavMeshAgent navMeshAgent;
    // private LastPlayerSighting globalLastPlayerSighting;
    private SphereCollider sightCollider;
    private CapsuleCollider touchCollider;
    private Animator animator;

    private GameObject player;
    private Animator playerAnimator;

    // private PlayerHealth playerHealth;
    private HashIDs hash;
    private Vector3 previousPersonalLastSighting;


    void Awake()
    {
        navMeshAgent = GetComponent<NavMeshAgent>();
        sightCollider = GetComponent<SphereCollider>();
        animator = GetComponent<Animator>();
        //globalLastPlayerSighting = GameObject.FindGameObjectWithTag(Tags.gameController).GetComponent<LastPlayerSighting>();
        player = GameObject.FindGameObjectWithTag(Tags.player);
        playerAnimator = player.GetComponent<Animator>();
        // playerHealth = player.GetComponent<PlayerHealth>();
        hash = GameObject.FindGameObjectWithTag(Tags.gameController).GetComponent<HashIDs>();

        personalLastSighting = previousPersonalLastSighting;
    }


}

