AFRAME.registerComponent("enemy-bullets",{
    init : function(){
        setInterval(this.shootEnemyBullet,2000)
    },
    shootEnemyBullet : function(){
        var els = document.querySelectorAll(".enemy")
        for(var i=0;i<els.length;i++){
            var enemyBullets = document.createElement("a-entity")
            enemyBullets.setAttribute("geometry",{
                primitive: "sphere",
                radius: 0.1
            })
            enemyBullets.setAttribute("material","color","#282b29")
            var position = els[i].getAttribute("position")
            enemyBullets.setAttribute("position",{
                x: position.x+1.5,
                y: position.y+3.5,
                z: position.z
            })
            var scene = document.querySelector("#scene")
            scene.appendChild(enemyBullets);

            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            var direction = new THREE.Vector3();
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            direction.subVectors(position1, position2).normalize();
            enemyBullets.setAttribute("velocity",direction.multiplyScalar(10))
            enemyBullets.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0",
            })
            var element = document.querySelector("#countLife")
            var playerLife = parseInt(element.getAttribute("text").value)
            enemyBullets.addEventListener("collide",function(e){
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife>0){   
                        playerLife -= 1
                        element.setAttribute("text",{
                            value: playerLife
                        })
                    }
                    if(playerLife <= 0){
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible",true);
                        var El = document.querySelectorAll(".enemy")
                        for(var i = 0; i < El.length; i++){
                            scene.removeChild(El[i])
                        }
                    }
                }
            })
        }
    }
})