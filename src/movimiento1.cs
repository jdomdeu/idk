// src/codigo/codigo.cs

using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class moverseSquelet : MonoBehaviour
{
    private Animator anim;
    public float rotationSpeed;
    public float moveSpeed;
    private float h;
    private float v;

    private bool Walking;
    private bool walk;

    public bool canAttack = true;
    public float attackDistance;
    public LayerMask aliens;
    public Vector3 rayOffset;
    private RaycastHit hit;

    private AudioSource audioS;
    public AudioClip swordSound;


    void Awake()
    {
        anim = GetComponent<Animator>();
        walk = true;
        audioS = GetComponent<AudioSource>();
    }

    // Update is called once per frame
    void Update()
    {
        if (walk)
        {
            h = Input.GetAxisRaw("Horizontal");
            transform.Rotate(Vector3.up * rotationSpeed * h * Time.deltaTime);

            v = Input.GetAxisRaw("Vertical");
            transform.Translate(Vector3.forward * moveSpeed * v * Time.deltaTime);

            Walking = Input.GetAxisRaw("Vertical") != 0;
            anim.SetBool("Run", Walking);
        }


        if (Input.GetMouseButtonDown(0) && canAttack)
        {
            anim.SetTrigger("Attack");
            canAttack = false;
            walk = false;
        }
    }

    public void RestoreAttack()
    {
        canAttack = true;
        walk = true;
    }

    public void PlayStepSound()
    {
        if (Physics.Raycast(transform.position + rayOffset, transform.forward, out hit, attackDistance, aliens))
        {
            hit.collider.GetComponent<alien>().Die();
        }

        audioS.pitch = Random.Range(0.9f, 1.4f);
        audioS.PlayOneShot(swordSound);

    }
}
