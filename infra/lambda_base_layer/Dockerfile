FROM amazonlinux:latest

# Install Python
RUN dnf search python3.11
RUN dnf install python3.11 -y && \
    dnf install python3.11-pip -y && \
    dnf install zip -y
#RUN yum install -y python310 && \
#    yum install -y python3-pip && \
#    yum install -y zip && \
#    yum clean all

# Setup Venv
RUN python3.11 -m pip install virtualenv
RUN python3.11 -m venv base
RUN source base/bin/activate

# Install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Zip it up for deployment
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash"]