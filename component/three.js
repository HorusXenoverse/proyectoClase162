AFRAME.registerComponent("bowling-balls",{
    init: function(){
        this.shootBall()
    },
    shootBall: function(){
        window.addEventListener("keydown", (e)=>{
            if (e.key === "z"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry", {primitive: "sphere", radius : 0.1})
                ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf")
                var camera = document.querySelector("#camera")
                var cameraPosition = camera.getAttribute("position")
                ball.setAttribute("position", {x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z})

                var camera3D = document.querySelector("#camera").object3D

                // Obtener la dirección de la cámara como un vector de Three.js
                var vector = new THREE.Vector3()
                camera3D.getWorldDirection(vector)

                // Establecer la velocidad y su dirección
                ball.setAttribute("velocity", vector.multiplyScalar(-10))
                
                // Establecer a la bala como un dynamic-body
                ball.setAttribute("dynamic-body" ,{shape: "sphere", mass: "0"})

                // Escucha de eventos
                ball.addEventListener("collide", this.removeBall )

                var scene = document.querySelector("#scene")
                scene.appendChild(ball)
            }
        })
    },
    removeBall: function (e) {
        // Entidad original (bala)
        console.log(e.detail.target.el);
    
        // Otra entidad que la bala toque
        console.log(e.detail.body.el);
    
        // Elemento de la bola
        var ballElement = e.detail.target.el
    
        // Elemento que es golpeado
        var elementHit = e.detail.body.el
     
    
        if (elementHit.id.includes("ball")) 
          {
            // Establecer el atributo "material"
            elementHit.setAttribute("material", {opacity: 1, transparent: true})
            
    
            // Impulso y vector punto
            var impulso = new CANNON.Vec3(-2, 2, 1)
            var point = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulso, point)
            
    
            // Eliminar escucha de evento
            ballElement.removeEventListener("collide", this.three)
            
            
            // Remover las balas de la escena
            var sceneRemove = document.querySelector("#scene")
            sceneRemove.removeChild(ballElement)
          
        }
      },
})