# CV Signature Verification

![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/adamseew/adamseew.github.io?display_timestamp=committer&style=plastic)

If you want to verify that you have a trusted version of my CV, first download the file: [seewald_cv_signed.pdf](https://adamseewald.cc/cv/seewald_cv_signed.pdf).

You will now need to:
- import the public key, 
- check my signed CV's signature. 

On a UNIX-based system, you can use [GPG](https://www.gnupg.org/) for this purpose.

To import the key, run in sequence
```bash
wget https://adamseewald.cc/cv/seewald_cv_pubkey.asc
gpg --import seewald_cv_pubkey.asc
```

You can now check the signature. From the directory where you downloaded the CV, run
```bash
gpg --verify seewald_cv_signed.pdf
```

You should be able to see that my CV was signed using the RSA key with the hash: ```22A1 D3CE DA4D 6864 2987 6ADE 4831 2D5B BFE0 C326```.