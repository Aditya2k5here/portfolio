# Drop-in evidence

The site links a credential to its actual document when the file exists here,
and says "on request" when it does not. Nothing is ever invented: adding a file
below is what turns a claim into a link.

Expected names, matched in `content/credentials.ts`:

| File                                   | Becomes a link on            |
|----------------------------------------|------------------------------|
| `Aditya-Srinivas-CV.pdf`               | Contact, and the nav CV link |
| `publication-sikkim.pdf`               | the publication card         |
| `cert-deeplearning-ai.pdf`             | Machine Learning / Deep Learning |
| `cert-infosys-springboard.pdf`         | Infosys Springboard          |
| `cert-simplilearn-fullstack.pdf`       | SimpliLearn Full Stack       |
| `cert-iit-bombay-java.pdf`             | IIT Bombay Java              |
| `ieee-membership.pdf`                  | the IEEE line                |

After adding one, set its `file` field in `content/credentials.ts`. A missing
file is not a bug; it renders honestly.
