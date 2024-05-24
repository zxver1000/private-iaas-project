

## private Iaas Api Server

### Summary

- Private 환경에서 AWS EC2와 같은 서비스를 만들어 보고 싶다라는 생각에 구현해 보았습니다
- iaas를 제공할때 필요한 api들을 Nestjs로 구현 하였습니다





## Architecture



![iaas](https://github.com/zxver1000/private-iaas-api-server/assets/78923992/3f7dad43-30e2-4ed5-bf2f-e6c578be4043)







## Tech Stacks

- **Nest js**
    - 서비스 이용에 필요한 API 서버를 구현함
    - http request를 통해 VM을 생성,삭제, 조회기능 구현
    - http request를 통해 Virtual network를 생성,삭제 조회기능 구현
    - 만약 사용하고있는 cloud image가 k8s이미지라면 k8s클러스터 설정을 할 수 있도록 구현하였습니다
    - node-ansible을 사용하여 ansible-playbook을 사용할 수 있도록 구현

- **Ansible**
    - 서비스 배포를 위해 자동화된 인프라 구축 및 시스템 프로비저닝을 제공함
    - NestJS와 함께 사용하여 반드시 동작되도록 보장함
- **KVM**
    - 서버의 자원을 가상화하는데 사용된 Hypervisor
- **MongoDB**
    - 서비스 이용에 필요한 데이터를 관리하는데 사용함
- **CloudImage**
    1. Ubuntu22.04,20.04,18.04이미지를 이용하여 SSH Network설정을 Customize한 cloudImage
    2. K8S.img
        1. k8s 환경설정을 Customize한 cloudImage입니다





## 제공기능

- VM 생성 조회 삭제 기능
- Virtual Network 생성 조회 삭제 기능
- K8S clsuter 구축 기능



## .env
```
PORT=
DBURI=(MONGODB)
```


