using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class MonsterController : MonoBehaviour {

    public Transform target; // Walk toward this target.position
    public float fieldOfViewAngle = 110f;
    public bool playerInSight = false;
    public Vector3 personalLastSighting;

    private NavMeshAgent agent;
    private SphereCollider sightCollider;
    private CapsuleCollider touchCollider;

    private Vector3 previousPersonalLastSighting;


	// Awake runs before Start()
	void Awake() {
		agent = this.GetComponent<NavMeshAgent> ();

        sightCollider = this.GetComponent<SphereCollider>();
        touchCollider = this.GetComponent<CapsuleCollider>();
	}

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		agent.SetDestination (target.position);

	}

    private void OnTriggerEnter(Collider other)
    {
        
    }
}

