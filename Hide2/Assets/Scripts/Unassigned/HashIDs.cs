using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HashIDs : MonoBehaviour
{
    public int dyingState;
    public int deadBool;

    // Start is called before the first frame update
    void Awake() {
        // This exactly matches the Layer name and State name in an Animator state machine
        dyingState = Animator.StringToHash("Base Layer.Dying");

        // This exactly matches the Parameter name in an Animator state machine
        deadBool = Animator.StringToHash("Dead");
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
